import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('displays children', () => {
    const text = 'Hello';
    const children = <span>{text}</span>;
    const container = render(<Layout>{children}</Layout>);
    expect(container.getByText(text).innerHTML).toEqual(text);
  });
});
