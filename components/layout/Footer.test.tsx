import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('has all the footer links', () => {
    const { container } = render(<Footer />);
    expect(container.querySelectorAll('a')).toHaveLength(9);
  });
});
