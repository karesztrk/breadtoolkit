export interface Settings {
  flour: number;
  water: number;
  salt: number;
  sourdough: number;
  sourdoughRatio: number;
}

export const defaultSettings: Settings = {
  flour: 500,
  water: 325,
  salt: 10,
  sourdough: 100,
  sourdoughRatio: 50,
};

export const saveCalculatorSettings = (settings: Settings) => {
  localStorage.setItem('calculator', JSON.stringify(settings));
};

export const loadCalculatorSettings = (): Settings => {
  const data = localStorage.getItem('calculator');
  if (!data) {
    return defaultSettings;
  }
  const settings = JSON.parse(data);
  return Object.keys(settings).length === 0 ? defaultSettings : settings;
};
