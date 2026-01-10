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
 * @param {string | undefined} lang
 * @returns {string} the locale specific date text
 */
export const formatDate = (date, lang = "en-GB") => {
  return new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(date);
};

/**
 * Translate lang code to a human-readable representation.
 * @param {string} locale - what to translate
 * @param {string} lang - target language
 * @returns {string | undefined} the locale specific language
 */
export const translateLocale = (locale, lang = "en-GB") => {
  const names = new Intl.DisplayNames(lang, { type: "language" });
  return names.of(locale);
};
