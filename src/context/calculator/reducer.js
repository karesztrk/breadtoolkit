import {
  calcDoughWeight,
  calcExtrasLiquid,
  calcSourDoughLiquid,
  convertToImperialUnits,
  defaultSettings,
  deriveIngredientsFromGoal,
} from "@service/calculator";

/**
 * @typedef {import('@service/types').Settings} Settings
 * @typedef {import('@service/types').SettingName} SettingName
 * @typedef {import('@service/types').ExtraIngredients} ExtraIngredients
 * @typedef {import('@service/types').ExtraIngredient} ExtraIngredient
 * @typedef {import('@service/types').DerivedIngredients} DerivedIngredients
 */

/**
 * @typedef {Object} SetSettingAction
 * @property {"setSetting"} type
 * @property {SettingName} key
 * @property {number} value
 */

/**
 * @typedef {Object} SetSettingsAction
 * @property {"setSettings"} type
 * @property {Settings} settings
 */

/**
 * @typedef {Object} InitializeAction
 * @property {"initialize"} type
 * @property {Settings} settings
 * @property {ExtraIngredients} extras
 */

/**
 * @typedef {Object} SwitchBakersMathAction
 * @property {"switchBakersMath"} type
 */

/**
 * @typedef {Object} SwitchImperialUnitsAction
 * @property {"switchImperialUnits"} type
 */

/**
 * @typedef {Object} ToggleExtraAction
 * @property {"toggleExtra"} type
 * @property {string} key
 */

/**
 * @typedef {Object} ChangeExtraAction
 * @property {"changeExtra"} type
 * @property {string} key
 * @property {number} amount
 * @property {number} water
 */

/**
 * @typedef {Object} SubmitDoughGoalAction
 * @property {"submitDoughGoal"} type
 * @property {number} goal
 */

/**
 * @typedef {Object} ResetSettingsAction
 * @property {"resetSettings"} type
 */

/**
 * @typedef {SetSettingAction | SetSettingsAction | InitializeAction | SwitchBakersMathAction | SwitchImperialUnitsAction | ToggleExtraAction | ChangeExtraAction | SubmitDoughGoalAction | ResetSettingsAction} Action
 */

/**
 * @typedef {Object} CalculatorState
 * @property {Settings} settings
 * @property {ExtraIngredients} extras
 * @property {number} dough
 * @property {number} liquids
 */

export const initialState = /** @type {CalculatorState} */ ({
  settings: {},
  extras: {},
  dough: 0,
  liquids: 0,
});

/**
 * @param {CalculatorState} state
 * @param {Action} action
 * @returns {CalculatorState}
 */
const reducer = (state, action) => {
  let newState = /** @type {CalculatorState} */ ({});

  switch (action.type) {
    case "setSetting": {
      newState = {
        ...state,
        settings: {
          ...state.settings,
          [action.key]: action.value,
        },
      };
      break;
    }

    case "setSettings": {
      newState = {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings,
        },
      };
      break;
    }

    case "initialize": {
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

    case "switchBakersMath": {
      newState = {
        ...state,
        settings: {
          ...state.settings,
          bakersMath: !state.settings.bakersMath,
        },
      };
      break;
    }

    case "switchImperialUnits": {
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

    case "toggleExtra": {
      const extras = {
        ...state.extras,
      };
      if (extras[action.key]) {
        extras[action.key].disabled = !extras[action.key].disabled;
      } else {
        extras[action.key] = /** @type {ExtraIngredient} */ ({
          disabled: false,
          amount: 0,
          liquid: 0,
          percent: 0,
        });
      }
      newState = {
        ...state,
        extras,
      };
      break;
    }

    case "changeExtra": {
      const extras = {
        ...state.extras,
      };
      const liquid = (action.water / 100) * action.amount;
      if (extras[action.key]) {
        extras[action.key].amount = action.amount;
        extras[action.key].liquid = liquid;
      } else {
        extras[action.key] = /** @type {ExtraIngredient} */ ({
          amount: action.amount,
          liquid,
        });
      }
      newState = {
        ...state,
        extras,
      };
      break;
    }

    case "submitDoughGoal": {
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

    case "resetSettings": {
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
  const sourDoughLiquid = calcSourDoughLiquid(bakersMath, sourdough, sourdoughRatio);
  const extraLiquid = calcExtrasLiquid(newState.extras);
  const liquids = water + sourDoughLiquid + extraLiquid;
  newState = {
    ...newState,
    dough,
    liquids,
  };

  return newState;
};

export default reducer;
