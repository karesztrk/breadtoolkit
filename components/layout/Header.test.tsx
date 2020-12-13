import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('Logo & language selector displayed', () => {
    const { container } = render(<Header />);
    expect(container.querySelectorAll('a')).toHaveLength(2);
  });
});
