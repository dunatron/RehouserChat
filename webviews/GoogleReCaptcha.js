import React, { Component } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const GoogleRecaptcha = props => {
  const html = `
    <html>
      <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        </script><script src="https://www.google.com/recaptcha/api.js"></script>
        
        <script type="text/javascript">
          var onloadCallback = function() {
            //alert("grecaptcha is ready!");
          };
          var onDataCallback = function(response) {
            //alert("Data callback fired")
            window.ReactNativeWebView.postMessage(response)
          };
        </script>
      </head>
      <body>
        <div id="captcha">
          <div style="text-align: center;">
            <div class="g-recaptcha" style="display: inline-block; height: auto;"
              data-sitekey="6Lc9N8MUAAAAAIJ6Q5SJ7pyZ4AX46ogbSuOyRbKU" data-callback="onDataCallback"
              data-expired-callback="onDataExpiredCallback"
              data-error-callback="onDataErrorCallback">
            </div>
          </div>
        <div>
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback"async defer></script>
      </body>
    </html>
    `;
  // const baseUrl = "http://10.110.6.22";
  // const baseUrl = "127.0.0.1";
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html, baseUrl: "http://127.0.0.1" }}
        onMessage={event => {
          // alert(event.nativeEvent.data);
          props.onMessage(event.nativeEvent.data);
        }}
      />
    </View>
  );
};

export default GoogleRecaptcha;
