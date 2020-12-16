import {
  Settings,
  DerivedIngredients,
  ExtraIngredients,
} from '@/types/calculator';

export const defaultSettings: Settings = {
  bakersMath: true,
  imperialUnits: false,
  flour: 500,
  water: 325,
  salt: 10,
  sourdough: 100,
  sourdoughRatio: 50,
};

export const supportedIngredients = [
  {
    key: 'egg',
    name: 'calculator.eggs-label',
    water: 75,
    calories: 143,
    macros: {
      protein: 12.6,
      fat: 9.5,
      carb: 0.7,
    },
  },
  {
    key: 'butter',
    name: 'calculator.butter-label',
    water: 16,
    calories: 742,
    macros: {
      protein: 0.4,
      fat: 80,
      carb: 0.5,
    },
  },
  {
    key: 'wholemilk',
    name: 'calculator.milk-whole-label',
    water: 88,
    calories: 62,
    macros: {
      protein: 3,
      fat: 3.5,
      carb: 4.6,
    },
  },
];

export const saveCalculatorSettings = (settings: Settings) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('calculator', JSON.stringify(settings));
  }
};

export const loadCalculatorSettings = (): Settings => {
  if (typeof window === 'undefined') {
    return {} as Settings;
  }
  const data = localStorage.getItem('calculator');
  if (!data) {
    return defaultSettings;
  }
  const settings = JSON.parse(data);
  return Object.keys(settings).length === 0 ? defaultSettings : settings;
};

export const calcHydration = (flour: number, liquids: number): string => {
  let hydration: string;
  if (flour < 1) {
    hydration = '100';
  } else if (liquids > flour) {
    hydration = '100+';
  } else {
    hydration = ((liquids / flour) * 100).toPrecision(3);
  }
  return hydration;
};

export const calcFlourPercent = (
  bakersMath: boolean,
  flour: number,
  dough: number,
) => (bakersMath ? 100 : (flour / dough) * 100);

export const calcIngredientPercent = (
  bakersMath: boolean,
  flour: number,
  amount: number,
  dough: number,
) => (amount / (bakersMath ? flour : dough)) * 100;

export const calcSourDoughLiquid = (
  bakersMath: boolean,
  sourdough: number,
  sourdoughRatio: number,
) => {
  if (bakersMath) {
    const sourDoughFlour = sourdough / (1 + sourdoughRatio / 100);
    return sourdough - sourDoughFlour;
  }
  return (sourdough * sourdoughRatio) / 100;
};

export const deriveIngredientsFromGoal = (
  goal: number,
  settings: Settings,
  extras: ExtraIngredients,
): DerivedIngredients => {
  const { flour, water, sourdough } = settings;
  const dough = calcDoughWeight(settings, extras);
  const flourPercent = calcFlourPercent(false, flour, dough);
  const waterPercent = calcIngredientPercent(false, flour, water, dough);
  const sourDoughPercent = calcIngredientPercent(
    false,
    flour,
    sourdough,
    dough,
  );
  const flourValue = Math.round((goal * flourPercent) / 100);
  const waterValue = Math.round((goal * waterPercent) / 100);
  const sourdoughValue = Math.round((goal * sourDoughPercent) / 100);

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
  const saltValue =
    goal - flourValue - waterValue - sourdoughValue - extraValue;
  return {
    flour: flourValue,
    water: waterValue,
    sourdough: sourdoughValue,
    salt: saltValue,
    extras: newExtras,
  };
};

export const calcDoughWeight = (
  settings: Settings,
  extras: ExtraIngredients,
) => {
  const { flour, water, sourdough, salt } = settings;
  const extrasWeight = calcExtrasWeight(extras);
  return flour + water + sourdough + salt + extrasWeight;
};

export const calcExtrasWeight = (extras: ExtraIngredients) => {
  return Object.values(extras).reduce((accumulator, { disabled, amount }) => {
    return accumulator + (disabled ? 0 : amount);
  }, 0);
};

export const calcExtrasLiquid = (extras: ExtraIngredients) => {
  return Object.values(extras).reduce((accumulator, { disabled, liquid }) => {
    return accumulator + (disabled ? 0 : liquid);
  }, 0);
};

export const convertToImperial = (value: number): number => {
  if (value < 0) {
    return 1;
  }
  const roundedValue = Math.round(value * 0.0352739619);
  return roundedValue || 1;
};

export const convertToMetric = (value: number): number => {
  if (value < 0) {
    return 1;
  }
  const roundedValue = Math.round(value / 0.0352739619);
  return roundedValue || 1;
};

export const convertToImperialUnits = (
  settings: Settings,
  extras: ExtraIngredients,
  imperialUnits: boolean,
): DerivedIngredients => {
  const { flour, salt, water, sourdough } = settings;
  const convertedFlour = imperialUnits
    ? convertToImperial(flour)
    : convertToMetric(flour);
  const convertedWater = imperialUnits
    ? convertToImperial(water)
    : convertToMetric(water);
  const convertedSalt = imperialUnits
    ? convertToImperial(salt)
    : convertToMetric(salt);
  const convertedSourdough = imperialUnits
    ? convertToImperial(sourdough)
    : convertToMetric(sourdough);
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
    extras: convertedExtras,
  };
};
