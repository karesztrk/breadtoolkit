/**
 * @param {string} id
 * @return {string}
 */
export const formatTitle = (id) => {
  const parts = id.split(".");
  return parts[0];
};
