import { ExtraIngredients, SettingName, Settings } from '@/types/calculator';

export type Action =
  | { type: 'setSetting'; key: SettingName; value: number }
  | { type: 'setSettings'; settings: Settings }
  | { type: 'initialize'; settings: Settings; extras: ExtraIngredients }
  | { type: 'switchBakersMath' }
  | { type: 'switchImperialUnits' }
  | { type: 'toggleExtra'; key: string }
  | { type: 'changeExtra'; key: string; amount: number; water: number }
  | { type: 'submitDoughGoal'; goal: number }
  | { type: 'resetSettings' };
