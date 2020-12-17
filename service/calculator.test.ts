import {
  calcHydration,
  calcFlourPercent,
  calcIngredientPercent,
  calcSourDoughLiquid,
  deriveIngredientsFromGoal,
  defaultSettings,
  calcDoughWeight,
  convertToImperial,
  convertToImperialUnits,
  calcExtrasWeight,
  calcExtrasLiquid,
} from './calculator';

describe('hydration', () => {
  it('does not exceed 100', () => {
    expect(
      calcHydration(
        {
          ...defaultSettings,
          flour: 2,
          sourdough: 40,
        },
        100,
      ),
    ).toEqual('100+');
  });
  it('accept zero flour', () => {
    expect(
      calcHydration(
        {
          ...defaultSettings,
          flour: 0,
          sourdough: 40,
        },
        100,
      ),
    ).toEqual('100+');
  });
  it('gives correct value', () => {
    expect(
      calcHydration(
        {
          ...defaultSettings,
          flour: 100,
          sourdough: 40,
        },
        50,
      ),
    ).toEqual('40.9');
  });
  it('has correct precision', () => {
    expect(
      calcHydration(
        {
          ...defaultSettings,
          flour: 100,
          sourdough: 40,
        },
        33.33333,
      ),
    ).toEqual('27.3');
  });
});

describe('flour percent', () => {
  it('gives correct value', () => {
    expect(calcFlourPercent(false, 80, 100)).toEqual(80);
  });
  it('accept zero amount', () => {
    expect(calcFlourPercent(false, 0, 100)).toEqual(0);
  });
  it("is 100 in baker's math", () => {
    expect(calcFlourPercent(true, 0, 100)).toEqual(100);
  });
});

describe('ingredient percent', () => {
  it('uses to the dough weight in normal percentage mode', () => {
    expect(calcIngredientPercent(false, 80, 10, 100)).toEqual(10);
  });
  it("uses to the flour weight in normal baker's math mode", () => {
    expect(calcIngredientPercent(true, 80, 10, 100)).toEqual(12.5);
  });
  it('accept zero amount', () => {
    expect(calcIngredientPercent(false, 80, 0, 100)).toEqual(0);
  });
});

describe('sour dough liquid', () => {
  it('gives correct value', () => {
    expect(calcSourDoughLiquid(false, 80, 50)).toEqual(40);
  });
  it("gives correct value for baker's math", () => {
    expect(calcSourDoughLiquid(true, 90, 80)).toEqual(40);
  });
});

describe('deriving', () => {
  it('gives correct value', () => {
    const result = deriveIngredientsFromGoal(500, defaultSettings, {});
    expect(result).toEqual({
      extras: {},
      flour: 262,
      salt: 5,
      sourdough: 52,
      water: 181,
    });
  });
  it('ingredients are having the goal weight in total', () => {
    const goal = 1234;
    const { flour, salt, sourdough, water } = deriveIngredientsFromGoal(
      goal,
      defaultSettings,
      {},
    );
    const derivedWeight = flour + salt + sourdough + water;
    expect(derivedWeight).toEqual(goal);
  });
  it('gives correct value for extra ingredients', () => {
    const goal = 500;
    const { extras } = deriveIngredientsFromGoal(goal, defaultSettings, {
      egg: { disabled: false, amount: 50, liquid: 80 },
    });
    expect(extras).toEqual({
      egg: {
        amount: 25,
        disabled: false,
        liquid: 18.75,
      },
    });
  });
  it('ingredients are having the goal weight in total including extras', () => {
    const goal = 1234;
    const { flour, salt, sourdough, water, extras } = deriveIngredientsFromGoal(
      goal,
      defaultSettings,
      {
        egg: { disabled: false, amount: 50, liquid: 80 },
      },
    );
    const derivedExtrasWeight = Object.values(extras).reduce(
      (accumulator, { disabled, amount }) => {
        return accumulator + (disabled ? 0 : amount);
      },
      0,
    );
    const derivedWeight =
      flour + salt + sourdough + water + derivedExtrasWeight;
    expect(derivedWeight).toEqual(goal);
  });
  it('ignores disabled exta ingredients', () => {
    const goal = 500;
    const extras = {
      egg: { disabled: true, amount: 50, liquid: 80 },
      milk: { disabled: true, amount: 100, liquid: 80 },
      butter: { disabled: true, amount: 150, liquid: 80 },
    };
    const result = deriveIngredientsFromGoal(goal, defaultSettings, extras);
    expect(result).toEqual({
      flour: 262,
      salt: 5,
      sourdough: 52,
      water: 181,
      extras,
    });
  });
});

describe('dough weight', () => {
  it('should consist of all ingredients own weight', () => {
    const extras = {
      egg: { disabled: false, amount: 50, liquid: 80 },
      milk: { disabled: false, amount: 50, liquid: 80 },
      butter: { disabled: true, amount: 50, liquid: 80 },
    };
    const result = calcDoughWeight(defaultSettings, extras);
    expect(result).toEqual(955 + 100);
  });
});

describe('imperial convertion', () => {
  it('should give precise value', () => {
    const imperialValue = convertToImperial(150);
    expect(imperialValue).toEqual(5);
  });
  it('ignores negative values', () => {
    const imperialValue = convertToImperial(-150);
    expect(imperialValue).toEqual(1);
  });
  it('result must be larger then zero', () => {
    const imperialValue = convertToImperial(0);
    expect(imperialValue).toEqual(1);
  });
});

describe('imperial convertion', () => {
  it('should give precise value', () => {
    const imperialValue = convertToImperial(150);
    expect(imperialValue).toEqual(5);
  });
  it('ignores negative values', () => {
    const imperialValue = convertToImperial(-150);
    expect(imperialValue).toEqual(1);
  });
  it('result must be larger then zero', () => {
    const imperialValue = convertToImperial(0);
    expect(imperialValue).toEqual(1);
  });
  it('can convert the whole settings', () => {
    const { flour, salt, water, sourdough, extras } = convertToImperialUnits(
      defaultSettings,
      { egg: { disabled: false, amount: 150, liquid: 80 } },
      true,
    );
    expect(flour).toEqual(convertToImperial(defaultSettings.flour));
    expect(salt).toEqual(convertToImperial(defaultSettings.salt));
    expect(water).toEqual(convertToImperial(defaultSettings.water));
    expect(sourdough).toEqual(convertToImperial(defaultSettings.sourdough));
    expect(extras.egg.amount).toEqual(convertToImperial(150));
    expect(extras.egg.liquid).toEqual(convertToImperial(80));
  });
  it('supports switching off imperial units for settings', () => {
    const { flour, salt, water, sourdough, extras } = convertToImperialUnits(
      defaultSettings,
      { egg: { disabled: false, amount: 150, liquid: 80 } },
      true,
    );
    const {
      flour: metricFlour,
      water: metricWater,
      salt: metricSalt,
      sourdough: metricSourdough,
      extras: metricExtras,
    } = convertToImperialUnits(
      { ...defaultSettings, flour, salt, water, sourdough },
      extras,
      false,
    );
    // Rounding causes differencies
    expect(metricFlour).toEqual(510);
    expect(metricWater).toEqual(340);
    expect(metricSalt).toEqual(28);
    expect(metricSourdough).toEqual(113);
    expect(metricExtras.egg.amount).toEqual(142);
    expect(metricExtras.egg.liquid).toEqual(85);
  });
});

describe('extras', () => {
  it('should be the enabled ingredients weight', () => {
    const extras = {
      egg: { disabled: false, amount: 50, liquid: 80 },
      milk: { disabled: false, amount: 50, liquid: 80 },
      butter: { disabled: true, amount: 50, liquid: 80 },
    };
    const result = calcExtrasWeight(extras);
    expect(result).toEqual(100);
  });
});

describe('extras liquid', () => {
  it('should be the enabled ingredients liquid', () => {
    const extras = {
      egg: { disabled: false, amount: 50, liquid: 80 },
      milk: { disabled: false, amount: 50, liquid: 80 },
      butter: { disabled: true, amount: 50, liquid: 80 },
    };
    const result = calcExtrasLiquid(extras);
    expect(result).toEqual(160);
  });
});
