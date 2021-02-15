import { render, screen } from '@testing-library/react';
import BaseIngredientsPanel from './BaseIngredientsPanel';
import { Settings } from '@/types/calculator';
import userEvent from '@testing-library/user-event';

describe('BaseIngredientsPanel', () => {
  it('rendered with empty data', () => {
    const settings = {} as Settings;
    const dough = 0;
    const onSettingChange = jest.fn();
    const onSettingsChange = jest.fn();
    render(
      <BaseIngredientsPanel
        settings={settings}
        dough={dough}
        onSettingChange={onSettingChange}
        onSettingsChange={onSettingsChange}
      />,
    );
    expect(screen.getAllByRole('spinbutton').length).toEqual(4);
    expect(screen.getByTestId('base-ingredients')).toBeInTheDocument();
  });
  it('can change the value of each ingredient', () => {
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
    const dough = 100;
    const onSettingChange = jest.fn();
    const onSettingsChange = jest.fn();
    render(
      <BaseIngredientsPanel
        settings={settings}
        dough={dough}
        onSettingChange={onSettingChange}
        onSettingsChange={onSettingsChange}
      />,
    );
    userEvent.type(screen.getAllByRole('spinbutton')[0], '1');
    expect(onSettingChange).toHaveBeenCalledWith('flour', 501);
    userEvent.type(screen.getAllByRole('spinbutton')[1], '2');
    expect(onSettingChange).toHaveBeenCalledWith('water', 402);
    userEvent.type(screen.getAllByRole('spinbutton')[2], '3');
    expect(onSettingChange).toHaveBeenCalledWith('salt', 23);
    userEvent.type(screen.getAllByRole('spinbutton')[3], '4');
    expect(onSettingChange).toHaveBeenCalledWith('sourdough', 84);
    expect(onSettingChange).toHaveBeenCalledTimes(4);
  });
  it('can be switch to yeast', () => {
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
    const dough = 0;
    const onSettingChange = jest.fn();
    const onSettingsChange = jest.fn();
    render(
      <BaseIngredientsPanel
        settings={settings}
        dough={dough}
        onSettingChange={onSettingChange}
        onSettingsChange={onSettingsChange}
      />,
    );

    userEvent.click(screen.getByRole('button'));
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getAllByRole('option')[1],
    );
    expect(
      (screen.getAllByRole('option')[0] as HTMLOptionElement).selected,
    ).toBe(false);
    expect(
      (screen.getAllByRole('option')[1] as HTMLOptionElement).selected,
    ).toBe(true);
    userEvent.click(screen.getByLabelText('submit'));
    expect(onSettingsChange).toHaveBeenCalledWith({
      bakersMath: true,
      flour: 54,
      imperialUnits: false,
      salt: 2,
      sourdough: 0,
      sourdoughRatio: 0,
      water: 44,
      yeast: 1.2,
    });
  });
});
