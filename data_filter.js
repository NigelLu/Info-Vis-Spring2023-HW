/** @format */

// * constant
const TARGET_ATTRIBUTES = [
  "end",
  "latitude",
  "longitude",
  "start",
  "tripdurationE",
  "tripdurationS",
];

/**
 * @summary - convert numerical data in-place
 *
 * @param {object[]} data - citi bike data
 * @param {str[]} targetAttributes - array of strings specifying target attributes to convert
 * @return {undefined} - in-place modification, no return value
 */
export const convertNumericalData = (data, targetAttributes = TARGET_ATTRIBUTES) => {
  data.forEach((item) =>
    targetAttributes.forEach((fieldName) => (item[fieldName] = Number(item[fieldName]))),
  );
};

export const getDataByMonth = (data, month) => {
  return data.filter((d) => d.month.toLowerCase() === month.toLowerCase());
};
