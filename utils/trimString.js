const trimString = (string, options = { maxLength: 60, truncate: false }) => {
  //trim the string to the maximum length
  if (string.length <= options.maxLength) return string;
  var trimmedString = string.substr(0, options.maxLength);

  //re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  );
  if (options.truncate) {
    trimmedString = trimmedString + "...";
  }
  return trimmedString;
};

export { trimString };
export default trimString;
