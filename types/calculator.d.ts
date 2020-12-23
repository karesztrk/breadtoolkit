import { type } from 'os';

export interface Settings {
  bakersMath: boolean;
  imperialUnits: boolean;
  flour: number;
  water: number;
  salt: number;
  sourdough: number;
  sourdoughRatio: number;
  yeast: number;
}

export type SettingName =
  | 'flour'
  | 'water'
  | 'salt'
  | 'sourdough'
  | 'sourdoughRatio'
  | 'yeast';

export interface DerivedIngredients {
  flour: number;
  water: number;
  salt: number;
  sourdough: number;
  yeast: number;
  extras: ExtraIngredients;
}

export type StarterName = 'yeast' | 'sourdough';

export interface ExtraIngredients {
  [key: string]: ExtraIngredient;
}

export interface ExtraIngredient {
  disabled: boolean;
  amount: number;
  liquid: number;
}
