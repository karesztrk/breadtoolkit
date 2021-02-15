import { render } from '@testing-library/react';
import EditableNumericText from './EditableNumericText';
import userEvent from '@testing-library/user-event';

describe('EditableNumericText', () => {
  it('rendered with basic props', () => {
    const text = <span data-testid="test">Hello</span>;
    const wrapper = render(
      <EditableNumericText
        value={1}
        onSubmit={() => {}}
        parser={() => 1}
        formatter={() => ''}
        pattern=".*"
      >
        {text}
      </EditableNumericText>,
    );
    expect(wrapper.getByTestId('test').innerHTML).toEqual('Hello');
  });
  it('can be edited', () => {
    const formattedValue = 'formatted';
    const formatter = jest.fn().mockReturnValue(formattedValue);
    const onSubmit = jest.fn();
    const text = <span data-testid="test">Hello</span>;
    const wrapper = render(
      <EditableNumericText
        value={1}
        onSubmit={onSubmit}
        parser={() => 1}
        formatter={formatter}
        pattern=".*"
      >
        {text}
      </EditableNumericText>,
    );
    userEvent.click(wrapper.getByRole('button'));
    expect(formatter).toHaveBeenCalled();
    expect(wrapper.getByRole('spinbutton')).toHaveValue(formattedValue);
    const buttons = wrapper.getAllByRole('button');
    const submitButton =
      buttons.find((elem) => elem.getAttribute('aria-label') === 'submit') ||
      buttons[0];
    userEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalled();
    expect(wrapper.getByTestId('test').innerHTML).toEqual('Hello');
  });
});
