import {
  calcHydratation,
  calcFlourPercent,
  calcIngredientPercent,
  calcSourDoughLiquid,
  deriveIngredientsFromGoal,
  defaultSettings,
  calcDoughWeight,
} from '../service/calculator';
import { expect } from 'chai';

describe('hydration', () => {
  it('does not exceed 100', () => {
    expect(calcHydratation(2, 100)).to.equal('100+');
  });
  it('accept zero flour', () => {
    expect(calcHydratation(0, 100)).to.equal('100');
  });
  it('gives correct value', () => {
    expect(calcHydratation(100, 50)).to.equal('50.0');
  });
  it('has correct precision', () => {
    expect(calcHydratation(100, 33.33333)).to.equal('33.3');
  });
});

describe('flour percent', () => {
  it('gives correct value', () => {
    expect(calcFlourPercent(false, 80, 100)).to.equal(80);
  });
  it('accept zero amount', () => {
    expect(calcFlourPercent(false, 0, 100)).to.equal(0);
  });
  it("is 100 in baker's math", () => {
    expect(calcFlourPercent(true, 0, 100)).to.equal(100);
  });
});

describe('ingredient percent', () => {
  it('uses to the dough weight in normal percentage mode', () => {
    expect(calcIngredientPercent(false, 80, 10, 100)).to.equal(10);
  });
  it("uses to the flour weight in normal baker's math mode", () => {
    expect(calcIngredientPercent(true, 80, 10, 100)).to.equal(12.5);
  });
  it('accept zero amount', () => {
    expect(calcIngredientPercent(false, 80, 0, 100)).to.equal(0);
  });
});

describe('sour dough liquid', () => {
  it('gives correct value', () => {
    expect(calcSourDoughLiquid(false, 80, 50)).to.equal(40);
  });
  it("gives correct value for baker's math", () => {
    expect(calcSourDoughLiquid(true, 90, 80)).to.equal(40);
  });
});

describe('deriving', () => {
  it('gives correct value', () => {
    const result = deriveIngredientsFromGoal(500, defaultSettings, {});
    expect(result).to.deep.equal({
      extras: {},
      flour: 267,
      salt: 6,
      sourdough: 53,
      water: 174,
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
    expect(derivedWeight).to.equal(goal);
  });
  it('gives correct value for extra ingredients', () => {
    const goal = 500;
    const { extras } = deriveIngredientsFromGoal(goal, defaultSettings, {
      egg: { disabled: false, amount: 50, liquid: 80 },
    });
    expect(extras).to.deep.equal({
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
    expect(derivedWeight).to.equal(goal);
  });
  it('ignores disabled exta ingredients', () => {
    const goal = 500;
    const extras = {
      egg: { disabled: true, amount: 50, liquid: 80 },
      milk: { disabled: true, amount: 100, liquid: 80 },
      butter: { disabled: true, amount: 150, liquid: 80 },
    };
    const result = deriveIngredientsFromGoal(goal, defaultSettings, extras);
    expect(result).to.deep.equal({
      flour: 267,
      salt: 6,
      sourdough: 53,
      water: 174,
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
    expect(result).to.equal(935 + 100);
  });
});
