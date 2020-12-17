import React from 'react';
import { render } from '@testing-library/react';
import ConfigSwitch from './ConfigSwitch';
import userEvent from '@testing-library/user-event';

describe('ConfigSwitch', () => {
  it('should be rendered correctly', () => {
    const label = 'Hello';
    const id = 'example';
    const onToggle = () => {};
    const { getByText, getByRole } = render(
      <ConfigSwitch
        id={id}
        label={label}
        disabled={false}
        onToggle={onToggle}
      />,
    );
    const inputElement = getByRole('checkbox');
    const labelElement = getByText(label);
    expect(labelElement).toBeVisible();
    expect(labelElement).toHaveAttribute('for', id);
    expect(inputElement).toBeVisible();
    expect(inputElement).toBeChecked();
  });
  it('can be switched off by receiving callback', () => {
    const label = 'Hello';
    const id = 'example';
    const onToggle = jest.fn();
    const { getByText, getByRole } = render(
      <ConfigSwitch
        id={id}
        label={label}
        disabled={false}
        onToggle={onToggle}
      />,
    );
    expect(getByRole('checkbox')).toBeChecked();
    userEvent.click(getByText(label));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
