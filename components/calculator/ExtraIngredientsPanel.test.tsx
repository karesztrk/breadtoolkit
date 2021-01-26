import React from 'react';
import { render, screen } from '@testing-library/react';
import ExtraIngredientsPanel from './ExtraIngredientsPanel';
import { ExtraIngredients, Settings } from '@/types/calculator';

describe('ExtraIngredientsPanel', () => {
  it('rendered with empty data', () => {
    const settings = {} as Settings;
    const onChangeExtras = jest.fn();
    const toggleExtra = jest.fn();
    const extras = {} as ExtraIngredients;
    const dough = 0;
    render(
      <ExtraIngredientsPanel
        settings={settings}
        onChangeExtras={onChangeExtras}
        toggleExtra={toggleExtra}
        extras={extras}
        dough={dough}
      />,
    );
    expect(screen.getByTestId('extra-ingredients')).toBeInTheDocument();
  });
});
