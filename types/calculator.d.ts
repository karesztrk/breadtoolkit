import { type } from 'os';

export interface Settings {
  bakersMath: boolean;
  imperialUnits: boolean;
  flour: number;
  water: number;
  salt: number;
  sourdough: number;
  sourdoughRatio: number;
}

export type SettingName =
  | 'flour'
  | 'water'
  | 'salt'
  | 'sourdough'
  | 'sourdoughRatio';

export interface DerivedIngredients {
  flour: number;
  water: number;
  salt: number;
  sourdough: number;
  extras: ExtraIngredients;
}

export interface ExtraIngredients {
  [key: string]: ExtraIngredient;
}

export interface ExtraIngredient {
  disabled: boolean;
  amount: number;
  liquid: number;
}
