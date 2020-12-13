import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('uses Bootstrap component class', () => {
    const { container } = render(<Footer />);
    expect(container.querySelectorAll('a')).toHaveLength(7);
  });
});
