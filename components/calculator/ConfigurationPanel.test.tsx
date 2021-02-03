import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfigurationPanel from './ConfigurationPanel';
import { Settings } from '@/types/calculator';
import userEvent from '@testing-library/user-event';

describe('ConfigurationPanel', () => {
  it('rendered with empty data', () => {
    const settings = {} as Settings;
    const onSwitchBakersMath = jest.fn();
    const onSwitchImperialUnits = jest.fn();
    render(
      <ConfigurationPanel
        imperialUnits
        bakersMath
        onSwitchBakersMath={onSwitchBakersMath}
        onSwitchImperialUnits={onSwitchImperialUnits}
      />,
    );
    expect(screen.getAllByRole('checkbox').length).toEqual(2);
  });
  it('invokes bakers math callback', () => {
    const onSwitchBakersMath = jest.fn();
    const onSwitchImperialUnits = jest.fn();
    const { rerender } = render(
      <ConfigurationPanel
        imperialUnits={false}
        bakersMath
        onSwitchBakersMath={onSwitchBakersMath}
        onSwitchImperialUnits={onSwitchImperialUnits}
      />,
    );
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onSwitchBakersMath).toHaveBeenCalled();
    rerender(
      <ConfigurationPanel
        imperialUnits={false}
        bakersMath={false}
        onSwitchBakersMath={onSwitchBakersMath}
        onSwitchImperialUnits={onSwitchImperialUnits}
      />,
    );
    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
  });
  it('invokes imperial units callback', () => {
    const settings = {
      imperialUnits: true,
    } as Settings;
    const onSwitchBakersMath = jest.fn();
    const onSwitchImperialUnits = jest.fn();
    const { rerender } = render(
      <ConfigurationPanel
        imperialUnits
        bakersMath={false}
        onSwitchBakersMath={onSwitchBakersMath}
        onSwitchImperialUnits={onSwitchImperialUnits}
      />,
    );
    expect(screen.getAllByRole('checkbox')[1]).toBeChecked();
    userEvent.click(screen.getAllByRole('checkbox')[1]);
    expect(onSwitchImperialUnits).toHaveBeenCalled();
    rerender(
      <ConfigurationPanel
        imperialUnits={false}
        bakersMath={false}
        onSwitchBakersMath={onSwitchBakersMath}
        onSwitchImperialUnits={onSwitchImperialUnits}
      />,
    );
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
  });
});
