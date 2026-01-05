/**
 * Format a recipe title.
 * @param {string} id
 * @return {string}
 */
export const formatTitle = (id) => {
  const parts = id.split(".");
  return parts[0];
};

/**
 * Format a recipe date.
 * @param {Date} date
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date);
};
