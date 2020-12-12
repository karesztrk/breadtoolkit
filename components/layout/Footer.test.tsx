import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

jest.mock('next-localization', () => ({
  useI18n: jest.fn().mockReturnValue({
    t: (key: string) => key,
  }),
}));

describe('Footer', () => {
  it('uses Bootstrap component class', () => {
    const { container } = render(<Footer />);
    expect(container.querySelectorAll('a')).toHaveLength(7);
  });
});
