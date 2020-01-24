import React from "react";
import { Text, View } from "native-base";

// const FormikErrors = ({ errors }) => {
//   if (!errors) return null;
//   return Object.entries(errors).map(([key, val], i) => {
//     console.log("error key => ", key);
//     console.log("error val => ", val);
//     const isObj = typeof val === "object";
//     return <RenderErrorShit val={val} />;
//     return <Text key={i}>{/* ${key} - ${val}${val} */}</Text>;
//   });
// };

// const RenderErrorShit = ({ val }) => {
//   const isObject = typeof val === "object" ? true : false;
//   return <Text>{isObject ? <RenderErrorShit val={val} /> : $val}</Text>;
// };

// export default FormikErrors;

const ListNestedValues = ({ errors, depth = 1 }) => {
  const nestedType = Object.prototype.toString.call(errors);
  switch (nestedType) {
    case "[object Object]": {
      return <ListFormikErrors errors={errors} depth={depth} />;
    }
    case "[object Array]": {
      return <ListArrayErrorValues errors={errors} depth={depth} />;
    }
    default: {
      return <ListFormikErrors errors={errors} depth={depth} />;
    }
  }
};

const pixelDepth = depth => depth * 4;

/**
 *
 * The path thing will work well, path = path + new key continue
 */
export const ListFormikErrors = ({ errors, depth = 1, touched }) => {
  if (!errors) return null;
  return Object.entries(errors).map(([key, val], idx) => {
    return (
      <Text
        key={idx}
        style={{
          display: "flex",
          // color: "red",
          paddingLeft: 100,
          padding: 100,
          margin: 100
          // paddingLeft: `${pixelDepth(depth)}pt`
          // paddingLeft: "100px"
        }}
      >
        {/* {key} */}
        <RenderKey keyVal={key} />
        {typeof val === "object" ? (
          <ListNestedValues errors={val} depth={depth + 1} />
        ) : (
          <RenderKeyVal val={val} />
        )}
      </Text>
    );
  });
};

const RenderKey = ({ keyVal }) => {
  return (
    <Text
      style={{
        color: "red",
        width: "100%",
        fontWeight: "900"
      }}
    >
      {keyVal}:{"\n"}
    </Text>
  );
};
const RenderKeyVal = ({ val }) => {
  return (
    <Text
      style={{
        display: "flex",
        color: "black",
        padding: -100,
        margin: 100,
        width: "100%",
        fontWeight: "600"
      }}
    >
      {val}
      {"\n"}
    </Text>
  );
};
const ListArrayErrorValues = ({ errors, depth = 1 }) => {
  return errors.map((val, idx) => {
    return (
      <Text
        key={idx}
        style={{
          display: "flex",
          // color: "red",
          paddingLeft: 100
          // paddingLeft: `${pixelDepth(depth)}pt`
        }}
      >
        <RenderKey keyVal={idx + 1} />
        {typeof val === "object" ? (
          <ListNestedValues errors={val} depth={depth + 1} />
        ) : (
          <RenderKeyVal val={val} />
        )}
      </Text>
    );
  });
};

export default ListFormikErrors;
