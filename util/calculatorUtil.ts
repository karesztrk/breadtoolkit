export interface Settings {
  bakersMath: boolean;
  flour: number;
  water: number;
  salt: number;
  sourdough: number;
  sourdoughRatio: number;
}

export const defaultSettings: Settings = {
  bakersMath: true,
  flour: 500,
  water: 325,
  salt: 10,
  sourdough: 100,
  sourdoughRatio: 50,
};

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

export const calcHydratation = (flour: number, liquids: number) => {
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

export const calcWaterPercent = (
  bakersMath: boolean,
  flour: number,
  water: number,
  dough: number,
) => (water / (bakersMath ? flour : dough)) * 100;

export const calcSaltPercent = (
  bakersMath: boolean,
  flour: number,
  salt: number,
  dough: number,
) => (salt / (bakersMath ? flour : dough)) * 100;

export const calcSourDoughPercent = (
  bakersMath: boolean,
  flour: number,
  sourdough: number,
  dough: number,
) => (sourdough / (bakersMath ? flour : dough)) * 100;

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
): Settings => {
  const { flour, water, sourdough } = settings;
  const flourPercent = calcFlourPercent(bakersMath, flour, dough);
  const waterPercent = calcWaterPercent(bakersMath, flour, water, dough);
  const sourDoughPercent = calcSourDoughPercent(
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
  const saltValue = goal - flourValue - waterValue - sourdoughValue;
  return {
    bakersMath,
    flour: flourValue,
    water: waterValue,
    sourdough: sourdoughValue,
    salt: saltValue,
    sourdoughRatio: -1,
  };
};
