import {
  calcDoughWeight,
  calcExtrasLiquid,
  calcSourDoughLiquid,
  convertToImperialUnits,
  defaultSettings,
  deriveIngredientsFromGoal,
} from '@/service/calculator';
import {
  ExtraIngredient,
  ExtraIngredients,
  Settings,
} from '@/types/calculator';
import { Reducer } from 'react';
import { Action } from './actions';

export interface CalculatorState {
  settings: Settings;
  extras: ExtraIngredients;
  dough: number;
  liquids: number;
}

export const initialState = {
  settings: {},
  extras: {},
  dough: 0,
  liquids: 0,
} as CalculatorState;

const reducer: Reducer<CalculatorState, Action> = (state, action) => {
  let newState = {} as CalculatorState;

  switch (action.type) {
    case 'setSetting': {
      newState = {
        ...state,
        settings: {
          ...state.settings,
          [action.key]: action.value,
        },
      };
      break;
    }

    case 'setSettings': {
      newState = {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings,
        },
      };
      break;
    }

    case 'initialize': {
      newState = {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings,
        },
        extras: {
          ...state.extras,
          ...action.extras,
        },
      };
      break;
    }

    case 'switchBakersMath': {
      newState = {
        ...state,
        settings: {
          ...state.settings,
          bakersMath: !state.settings.bakersMath,
        },
      };
      break;
    }

    case 'switchImperialUnits': {
      const newStateImperialUnits = !state.settings.imperialUnits;
      const derivedIngredients = convertToImperialUnits(
        state.settings,
        state.extras,
        newStateImperialUnits,
      );
      newState = {
        ...state,
        settings: {
          ...state.settings,
          flour: derivedIngredients.flour,
          water: derivedIngredients.water,
          salt: derivedIngredients.salt,
          sourdough: derivedIngredients.sourdough,
          imperialUnits: newStateImperialUnits,
        },
        extras: derivedIngredients.extras,
      };
      break;
    }

    case 'toggleExtra': {
      const extras = {
        ...state.extras,
      };
      if (extras[action.key]) {
        extras[action.key].disabled = !extras[action.key].disabled;
      } else {
        extras[action.key] = {
          disabled: false,
          amount: 0,
          liquid: 0,
          percent: 0,
        } as ExtraIngredient;
      }
      newState = {
        ...state,
        extras,
      };
      break;
    }

    case 'changeExtra': {
      const extras = {
        ...state.extras,
      };
      const liquid = (action.water / 100) * action.amount;
      if (extras[action.key]) {
        extras[action.key].amount = action.amount;
        extras[action.key].liquid = liquid;
      } else {
        extras[action.key] = {
          amount: action.amount,
          liquid,
        } as ExtraIngredient;
      }
      newState = {
        ...state,
        extras,
      };
      break;
    }

    case 'submitDoughGoal': {
      const {
        flour,
        water,
        sourdough,
        yeast,
        salt,
        extras: newExtras,
      } = deriveIngredientsFromGoal(action.goal, state.settings, state.extras);
      newState = {
        ...state,
        settings: {
          ...state.settings,
          flour,
          water,
          sourdough,
          salt,
          yeast,
        },
        extras: newExtras,
      };
      break;
    }

    case 'resetSettings': {
      const { bakersMath, imperialUnits } = state.settings;
      if (imperialUnits) {
        const { flour, water, salt, sourdough } = convertToImperialUnits(
          defaultSettings,
          {},
          imperialUnits,
        );
        newState = {
          ...state,
          settings: {
            ...defaultSettings,
            bakersMath,
            imperialUnits,
            flour,
            water,
            salt,
            sourdough,
          },
        };
      } else {
        newState = {
          ...state,
          settings: defaultSettings,
        };
      }
      break;
    }
    default:
      newState = state;
      break;
  }

  const dough = calcDoughWeight(newState.settings, newState.extras);
  const { bakersMath, sourdough, sourdoughRatio, water } = newState.settings;
  const sourDoughLiquid = calcSourDoughLiquid(
    bakersMath,
    sourdough,
    sourdoughRatio,
  );
  const extraLiquid: number = calcExtrasLiquid(newState.extras);
  const liquids = water + sourDoughLiquid + extraLiquid;
  newState = {
    ...newState,
    dough,
    liquids,
  };

  return newState;
};

export default reducer;
