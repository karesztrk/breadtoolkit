import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('supports search term typing', () => {
    const term = 'Hello world';
    const onChange = jest.fn();
    render(<SearchInput onChange={onChange} />);
    userEvent.type(screen.getByRole('textbox'), term);
    expect(onChange).toHaveBeenCalledTimes(term.length);
    expect(onChange).toHaveBeenLastCalledWith(term.toLocaleLowerCase());
  });
});
