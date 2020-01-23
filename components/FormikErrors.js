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

const ListNestedValues = ({ errors, depth }) => {
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

/**
 *
 * The path thing will work well, path = path + new key continue
 */
export const ListFormikErrors = ({ errors, depth, touched }) => {
  if (!errors) return null;
  return Object.entries(errors).map(([key, val], idx) => {
    return (
      <Text key={idx} style={{ display: "block", color: "red" }}>
        {key}
        {typeof val === "object" ? (
          <ListNestedValues errors={val} depth={depth + 1} />
        ) : (
          val
        )}
      </Text>
    );
  });
};
const ListArrayErrorValues = ({ errors, depth }) => {
  return errors.map((val, idx) => {
    return (
      <Text
        key={idx}
        style={{ display: "block", color: "red", paddingLeft: 100 }}
      >
        {idx + 1}
        {typeof val === "object" ? (
          <ListNestedValues errors={val} depth={depth + 1} />
        ) : (
          val
        )}
      </Text>
    );
  });
};

export default ListFormikErrors;
