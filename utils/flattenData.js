const flattenDataDescriptions = (json, masterKey) => {
  const flattenedObj = Object.entries(json).reduce(
    (descriptions, [key, value]) => ({
      ...descriptions,
      [`${masterKey}.${key}`]: `${value.name} - ${value.description} `
    }),
    {}
  );
  return flattenedObj;
};

const flattenDataValues = (json, masterKey) => {
  const flattenedObj = Object.entries(json).reduce(
    (values, [key, value]) => ({
      ...values,
      [`agreement.${key}`]: value.value
    }),
    {}
  );
  return flattenedObj;
};

export { flattenDataDescriptions, flattenDataValues };
