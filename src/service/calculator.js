/**
 * @typedef {import('@service/types').Settings} Settings
 * @typedef {import('@service/types').ExtraIngredients} ExtraIngredients
 * @typedef {import('@service/types').DerivedIngredients} DerivedIngredients
 */

/** @type {Settings} */
export const defaultSettings = {
  bakersMath: true,
  imperialUnits: false,
  flour: 500,
  water: 345,
  salt: 10,
  sourdough: 100,
  sourdoughRatio: 80,
  yeast: 0,
};

export const supportedIngredients = [
  {
    key: "egg",
    name: "eggsLabel",
    water: 75,
    calories: 143,
    macros: {
      protein: 12.6,
      fat: 9.5,
      carb: 0.7,
    },
  },
  {
    key: "butter",
    name: "butterLabel",
    water: 16,
    calories: 742,
    macros: {
      protein: 0.4,
      fat: 80,
      carb: 0.5,
    },
  },
  {
    key: "wholemilk",
    name: "milkWholeLabel",
    water: 88,
    calories: 62,
    macros: {
      protein: 3,
      fat: 3.5,
      carb: 4.6,
    },
  },
];

/**
 * @param {Settings} settings
 */
export const saveCalculatorSettings = (settings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("calculator", JSON.stringify(settings));
  }
};

/**
 * @returns {Settings}
 */
export const loadCalculatorSettings = () => {
  if (typeof window === "undefined") {
    return /** @type Settings */ ({});
  }
  const data = localStorage.getItem("calculator");
  if (!data) {
    return defaultSettings;
  }
  const settings = JSON.parse(data);
  return Object.keys(settings).length === 0 ? defaultSettings : settings;
};

/**
 * @param {Settings} settings
 * @param {number} liquids
 * @returns {string}
 */
export const calcHydration = (settings, liquids) => {
  const sourDoughFlour =
    settings.sourdough -
    calcSourDoughLiquid(settings.bakersMath, settings.sourdough, settings.sourdoughRatio);
  const flour = settings.flour + sourDoughFlour;
  let hydration;
  if (flour < 1) {
    hydration = "100";
  } else if (liquids > flour) {
    hydration = "100+";
  } else {
    hydration = ((liquids / flour) * 100).toPrecision(3);
  }
  return hydration;
};

/**
 * @param {boolean} bakersMath
 * @param {number} flour
 * @param {number} dough
 * @returns {number}
 */
export const calcFlourPercent = (bakersMath, flour, dough) =>
  bakersMath ? 100 : (flour / dough) * 100;

/**
 * @param {boolean} bakersMath
 * @param {number} flour
 * @param {number} amount
 * @param {number} dough
 * @returns {number}
 */
export const calcIngredientPercent = (bakersMath, flour, amount, dough) =>
  (amount / (bakersMath ? flour : dough)) * 100;

/**
 * @param {boolean} bakersMath
 * @param {number} sourdough
 * @param {number} sourdoughRatio
 * @returns {number}
 */
export const calcSourDoughLiquid = (bakersMath, sourdough, sourdoughRatio) => {
  if (bakersMath) {
    const sourDoughFlour = sourdough / (1 + sourdoughRatio / 100);
    return sourdough - sourDoughFlour;
  }
  return (sourdough * sourdoughRatio) / 100;
};

/**
 * @param {number} goal
 * @param {Settings} settings
 * @param {ExtraIngredients} extras
 * @returns {DerivedIngredients}
 */
export const deriveIngredientsFromGoal = (goal, settings, extras) => {
  const { flour, water, sourdough, yeast } = settings;
  const dough = calcDoughWeight(settings, extras);
  const flourPercent = calcFlourPercent(false, flour, dough);
  const waterPercent = calcIngredientPercent(false, flour, water, dough);
  const sourDoughPercent = calcIngredientPercent(false, flour, sourdough, dough);
  const yeastPercent = yeast ? calcIngredientPercent(false, flour, yeast, dough) : 0;
  const flourValue = Math.round((goal * flourPercent) / 100);
  const waterValue = Math.round((goal * waterPercent) / 100);
  const sourdoughValue = Math.round((goal * sourDoughPercent) / 100);
  const yeastValue = yeast ? Math.round((goal * yeastPercent) / 100) : 0;

  const newExtras = {
    ...extras,
  };
  let extraValue = 0;
  Object.keys(extras).forEach((extra) => {
    const { amount, disabled } = extras[extra];
    if (!disabled) {
      const supportedIngredient = supportedIngredients.find(
        (ingredient) => ingredient.key === extra,
      );
      if (supportedIngredient) {
        const percent = calcIngredientPercent(false, flour, amount, dough);
        const value = Math.round((goal * percent) / 100);
        extraValue += value;
        newExtras[extra].amount = value;
        newExtras[extra].liquid = (supportedIngredient.water / 100) * value;
      }
    }
  });
  const saltValue = goal - flourValue - waterValue - sourdoughValue - yeastValue - extraValue;
  return {
    flour: flourValue,
    water: waterValue,
    sourdough: sourdoughValue,
    salt: saltValue,
    yeast: yeastValue,
    extras: newExtras,
  };
};

/**
 * @param {Settings} settings
 * @param {ExtraIngredients} extras
 */
export const calcDoughWeight = (settings, extras) => {
  const { flour, water, sourdough, yeast, salt } = settings;
  const extrasWeight = calcExtrasWeight(extras);
  return flour + water + sourdough + salt + extrasWeight + (yeast || 0);
};

/**
 * @param {ExtraIngredients} extras
 */
export const calcExtrasWeight = (extras) => {
  return Object.values(extras).reduce((accumulator, { disabled, amount }) => {
    return accumulator + (disabled ? 0 : amount);
  }, 0);
};

/**
 * @param {ExtraIngredients} extras
 */
export const calcExtrasLiquid = (extras) => {
  return Object.values(extras).reduce((accumulator, { disabled, liquid }) => {
    return accumulator + (disabled ? 0 : liquid);
  }, 0);
};

/**
 * @param {number} value
 * @returns {number}
 */
export const convertToImperial = (value) => {
  if (value < 0) {
    return 1;
  }
  const roundedValue = Math.round(value * 0.0352739619);
  return roundedValue || 1;
};

/**
 * @param {number} value
 * @returns {number}
 */
export const convertToMetric = (value) => {
  if (value < 0) {
    return 1;
  }
  const roundedValue = Math.round(value / 0.0352739619);
  return roundedValue || 1;
};

/**
 * @param {Settings} settings
 * @param {ExtraIngredients} extras
 * @param {boolean} imperialUnits
 * @returns {DerivedIngredients}
 */
export const convertToImperialUnits = (settings, extras, imperialUnits) => {
  const { flour, salt, yeast, water, sourdough } = settings;
  const convertedFlour = imperialUnits ? convertToImperial(flour) : convertToMetric(flour);
  const convertedWater = imperialUnits ? convertToImperial(water) : convertToMetric(water);
  const convertedSalt = imperialUnits ? convertToImperial(salt) : convertToMetric(salt);
  const convertedSourdough = imperialUnits
    ? convertToImperial(sourdough)
    : convertToMetric(sourdough);
  const convertedYeast = imperialUnits ? convertToImperial(yeast) : convertToMetric(yeast);
  const convertedExtras = {
    ...extras,
  };
  Object.keys(extras).forEach((extra) => {
    const { amount, liquid } = extras[extra];
    convertedExtras[extra].amount = imperialUnits
      ? convertToImperial(amount)
      : convertToMetric(amount);
    convertedExtras[extra].liquid = imperialUnits
      ? convertToImperial(liquid)
      : convertToMetric(liquid);
  });
  return {
    flour: convertedFlour,
    water: convertedWater,
    salt: convertedSalt,
    sourdough: convertedSourdough,
    yeast: convertedYeast || 0,
    extras: convertedExtras,
  };
};

/**
 * @param {Settings} settings
 */
export const convertToYeast = (settings) => {
  const { flour, water, bakersMath, sourdough, sourdoughRatio } = settings;
  const sourdoughLiquid = Math.round(calcSourDoughLiquid(bakersMath, sourdough, sourdoughRatio));
  const sourdoughFlour = sourdough - sourdoughLiquid;
  const yeast = sourdough * 0.15;
  return {
    ...settings,
    flour: flour + sourdoughFlour,
    water: water + sourdoughLiquid,
    sourdough: 0,
    sourdoughRatio: 0,
    yeast,
  };
};

/**
 * @param {Settings} settings
 */
export const convertToSourdough = (settings) => {
  const { bakersMath, flour, water, yeast } = settings;
  const sourdough = yeast / 0.15;
  const sourdoughRatio = 80;
  const sourdoughLiquid = Math.round(calcSourDoughLiquid(bakersMath, sourdough, sourdoughRatio));
  const sourdoughFlour = sourdough - sourdoughLiquid;
  return {
    ...settings,
    flour: flour - sourdoughFlour,
    water: water - sourdoughLiquid,
    sourdough,
    sourdoughRatio: 80,
    yeast: 0,
  };
};
