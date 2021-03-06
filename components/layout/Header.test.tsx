import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('Logo', () => {
    const { container } = render(<Header />);
    expect(container.querySelectorAll('a[aria-label="Home"]')).toHaveLength(1);
  });
});
