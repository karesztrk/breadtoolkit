import React from 'react';
import { render } from '@testing-library/react';
import NumberInputSwitch from './NumberInputSwitch';
import userEvent, { TargetElement } from '@testing-library/user-event';

describe('NumberInputSwtich', () => {
  it('should be rendered correctly', () => {
    const label = 'Hello';
    const id = 'example';
    const value = 10;
    const onChangeValue = () => {};
    const onToggle = () => {};
    const { getByText, getByRole } = render(
      <NumberInputSwitch
        id={id}
        disabled={false}
        label={label}
        value={value}
        onChangeValue={onChangeValue}
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
    const value = 10;
    const onToggle = jest.fn();
    const { getByRole } = render(
      <NumberInputSwitch
        id={id}
        disabled={false}
        label={label}
        value={value}
        onChangeValue={() => {}}
        onToggle={onToggle}
      />,
    );
    expect(getByRole('checkbox')).toBeChecked();
    userEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
  it('shows disabled state', () => {
    const label = 'Hello';
    const id = 'example';
    const value = 10;
    const { getByRole, getByText } = render(
      <NumberInputSwitch
        id={id}
        disabled={true}
        label={label}
        value={value}
        onChangeValue={() => {}}
        onToggle={() => {}}
      />,
    );
    expect(getByRole('checkbox')).not.toBeChecked();
    expect(getByText(label)).toBeVisible();
    expect(getByText(label)).toHaveAttribute('data-disabled');
    expect(getByRole('spinbutton')).toBeDisabled();
  });
  it('can change input value if enabled', () => {
    const label = 'Hello';
    const id = 'example';
    let value = 10;
    const onChangeValue = jest.fn().mockImplementation((newValue) => {
      value = newValue;
    });
    const { getByRole, container } = render(
      <NumberInputSwitch
        id={id}
        disabled={false}
        label={label}
        value={value}
        onChangeValue={onChangeValue}
        onToggle={() => {}}
      />,
    );
    expect(getByRole('checkbox')).toBeChecked();
    userEvent.click(
      container.querySelector('input ~ div div') as TargetElement,
    );
    expect(value).toEqual('11');
  });
});
