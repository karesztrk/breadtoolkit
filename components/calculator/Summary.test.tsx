import React from 'react';
import { render, screen } from '@testing-library/react';
import Summary from './Summary';
import { ExtraIngredients, Settings } from '@/types/calculator';
import userEvent from '@testing-library/user-event';

describe('Summary', () => {
  it('rendered with empty data', () => {
    const settings = {} as Settings;
    const extras = {} as ExtraIngredients;
    const dough = 0;
    const liquids = 0;
    const onDoughGoalSubmit = jest.fn();
    const onResetSettings = jest.fn();
    render(
      <Summary
        settings={settings}
        extras={extras}
        dough={dough}
        liquids={liquids}
        onDoughGoalSubmit={onDoughGoalSubmit}
        onResetSettings={onResetSettings}
      />,
    );
    expect(screen.getByTestId('summary')).toBeInTheDocument();
    expect(screen.getByTestId('share')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });
  it('supports sharing', () => {
    const settings: Settings = {
      bakersMath: true,
      flour: 50,
      imperialUnits: false,
      salt: 2,
      sourdough: 8,
      sourdoughRatio: 80,
      water: 40,
      yeast: 0,
    };
    const extras = {} as ExtraIngredients;
    const dough = 100;
    const liquids = 40;
    const onDoughGoalSubmit = jest.fn();
    const onResetSettings = jest.fn();
    render(
      <Summary
        settings={settings}
        extras={extras}
        dough={dough}
        liquids={liquids}
        onDoughGoalSubmit={onDoughGoalSubmit}
        onResetSettings={onResetSettings}
      />,
    );
    expect(screen.getByText('100 gramm')).toBeInTheDocument();
    expect(screen.getByText('Víztartalom 73.5%')).toBeInTheDocument();
  });
  it('supports reset settings', () => {
    const settings = {} as Settings;
    const extras = {} as ExtraIngredients;
    const dough = 0;
    const liquids = 0;
    const onDoughGoalSubmit = jest.fn();
    const onResetSettings = jest.fn();
    render(
      <Summary
        settings={settings}
        extras={extras}
        dough={dough}
        liquids={liquids}
        onDoughGoalSubmit={onDoughGoalSubmit}
        onResetSettings={onResetSettings}
      />,
    );
    userEvent.click(screen.getByTestId('reset'));
    expect(onResetSettings).toHaveBeenCalled();
  });
  it('can submit new dough goal', () => {
    const settings = {} as Settings;
    const extras = {} as ExtraIngredients;
    const dough = 100;
    const goal = 10;
    const liquids = 0;
    const onDoughGoalSubmit = jest.fn();
    const onResetSettings = jest.fn();
    render(
      <Summary
        settings={settings}
        extras={extras}
        dough={dough}
        liquids={liquids}
        onDoughGoalSubmit={onDoughGoalSubmit}
        onResetSettings={onResetSettings}
      />,
    );
    userEvent.click(screen.getByLabelText('edit'));
    userEvent.type(screen.getByRole('spinbutton'), `${goal}`);
    userEvent.click(screen.getByLabelText('submit'));
    expect(onDoughGoalSubmit).toHaveBeenCalledWith(10010);

    userEvent.click(screen.getByLabelText('edit'));
    userEvent.click(screen.getByLabelText('close'));
    expect(onDoughGoalSubmit).toHaveBeenCalledTimes(1);
  });
});
