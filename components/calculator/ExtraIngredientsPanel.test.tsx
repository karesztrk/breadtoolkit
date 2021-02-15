import { render, screen } from '@testing-library/react';
import ExtraIngredientsPanel from './ExtraIngredientsPanel';
import { ExtraIngredients } from '@/types/calculator';

describe('ExtraIngredientsPanel', () => {
  it('rendered with empty data', () => {
    const onChangeExtras = jest.fn();
    const toggleExtra = jest.fn();
    const extras = {} as ExtraIngredients;
    const dough = 0;
    render(
      <ExtraIngredientsPanel
        imperialUnits
        bakersMath
        flour={0}
        onChangeExtras={onChangeExtras}
        toggleExtra={toggleExtra}
        extras={extras}
        dough={dough}
      />,
    );
    expect(screen.getByTestId('extra-ingredients')).toBeInTheDocument();
  });
});
