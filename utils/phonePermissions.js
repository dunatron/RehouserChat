import * as Permissions from "expo-permissions";
import { genericToast } from "./genericToast";
import { Platform, StyleSheet } from "react-native";

const resetNotificationsText =
  Platform.OS === "ios"
    ? "general > reset > reset location & privacy"
    : "Settings > App Permissions > App Permissions";
const resetNotificationTimeout = 5000;

const resetCameraText =
  Platform.OS === "ios"
    ? "To reset location, camera and microphone permissions. Settings > General > Reset > Reset Location & Privacy"
    : "To reset permissions open the Settings app > Tap Apps & notifications > Find Rehouser app";

const resetPermissionTimeout = resetText =>
  setTimeout(function() {
    genericToast(resetText);
  }, resetNotificationTimeout);

const cameraPermissions = async warningMessage => {
  const cameraRollPermissions = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
  );
  if (cameraRollPermissions.status !== "granted") {
    genericToast(
      warningMessage
        ? warningMessage
        : "Camera permissions have not been granted, this is required to upload images for your property or for inspections",
      {
        position: "bottom",
        type: "warning"
      }
    );
    resetPermissionTimeout(resetCameraText);
  }
  return;
};

const notificationPermissions = async () => {
  const notificationPermissions = await Permissions.askAsync(
    Permissions.NOTIFICATIONS
  );
  //   permissions statuses
  if (notificationPermissions.status !== "granted") {
    genericToast(
      "Notifications have not been granted and are a huge part of this app",
      {
        position: "bottom",
        type: "danger"
      }
    );
    resetPermissionTimeout(resetNotificationsText);
  }

  return;
};

// could potentially supply some messages for these on startup?
// use phonePermissions at the start to try and get all permssions accross the line
const phonePermissions = async () => {
  // wait for the permissions to be asked for each
  await cameraPermissions();
  await notificationPermissions();
  return;
};

export { phonePermissions, cameraPermissions, notificationPermissions };
export default phonePermissions;
