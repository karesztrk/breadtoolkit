/**
 * @typedef {Object} Settings
 * @property {boolean} bakersMath
 * @property {boolean} imperialUnits
 * @property {number} flour
 * @property {number} water
 * @property {number} salt
 * @property {number} sourdough
 * @property {number} sourdoughRatio
 * @property {number} yeast
 */

/**
 * @typedef {"flour" | "water" | "salt" | "sourdough" | "sourdoughRatio" | "yeast"} SettingName
 */

/**
 * @typedef {Object} DerivedIngredients
 * @property {number} flour
 * @property {number} water
 * @property {number} salt
 * @property {number} sourdough
 * @property {number} yeast
 * @property {ExtraIngredients} extras
 */

/**
 * @typedef {"yeast" | "sourdough"} StarterName
 */

/**
 * @typedef {Object.<string, ExtraIngredient>} ExtraIngredients
 */

/**
 * @typedef {Object} ExtraIngredient
 * @property {boolean} disabled
 * @property {number} amount
 * @property {number} liquid
 */

export {};
