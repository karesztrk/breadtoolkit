export interface Settings {
  bakersMath: boolean;
  flour: number;
  water: number;
  salt: number;
  sourdough: number;
  sourdoughRatio: number;
  extras: ExtraIngredients;
}

export const defaultSettings: Settings = {
  bakersMath: true,
  flour: 500,
  water: 325,
  salt: 10,
  sourdough: 100,
  sourdoughRatio: 50,
  extras: {},
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

export interface ExtraIngredients {
  [key: string]: ExtraIngredient;
}

export interface ExtraIngredient {
  disabled: boolean;
  amount: number;
  liquid: number;
}

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

export const calcHydratation = (flour: number, liquids: number): string => {
  let hydratation: string;
  if (flour < 1) {
    hydratation = '100';
  } else if (liquids > flour) {
    hydratation = '100+';
  } else {
    hydratation = ((liquids / flour) * 100).toPrecision(3);
  }
  return hydratation;
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
  bakersMath: boolean,
  goal: number,
  dough: number,
  settings: Settings,
  extras: ExtraIngredients,
): Settings => {
  const { flour, water, sourdough } = settings;
  const flourPercent = calcFlourPercent(bakersMath, flour, dough);
  const waterPercent = calcIngredientPercent(bakersMath, flour, water, dough);
  const sourDoughPercent = calcIngredientPercent(
    bakersMath,
    flour,
    sourdough,
    dough,
  );
  const flourValue = bakersMath
    ? Math.round(goal * (flour / dough))
    : Math.round((goal * flourPercent) / 100);
  const waterValue = bakersMath
    ? Math.round((flourValue * waterPercent) / 100)
    : Math.round((goal * waterPercent) / 100);
  const sourdoughValue = bakersMath
    ? Math.round((flourValue * sourDoughPercent) / 100)
    : Math.round((goal * sourDoughPercent) / 100);

  const newExtras = {
    ...extras,
  };
  Object.keys(extras).forEach((extra) => {
    const { amount, disabled } = extras[extra];
    if (!disabled) {
      const percent = calcIngredientPercent(bakersMath, flour, amount, dough);
      const value = bakersMath
        ? Math.round((flourValue * percent) / 100)
        : Math.round((goal * percent) / 100);
      newExtras[extra].amount = value;
      const supportedIngredient = supportedIngredients.find(
        (ingredient) => ingredient.key === extra,
      );
      if (supportedIngredient) {
        newExtras[extra].liquid = (supportedIngredient.water / 100) * value;
      }
    }
  });
  const saltValue = goal - flourValue - waterValue - sourdoughValue;
  return {
    bakersMath,
    flour: flourValue,
    water: waterValue,
    sourdough: sourdoughValue,
    salt: saltValue,
    sourdoughRatio: -1,
    extras: newExtras,
  };
};
