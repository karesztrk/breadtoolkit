import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('can be rendered without error', () => {
    const title = 'title';
    const to = 'to';
    render(<Card to={to} title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('display a decription', () => {
    const title = 'title';
    const to = 'to';
    const description = 'description';
    const { rerender } = render(<Card to={to} title={title} />);
    expect(screen.queryByText(description)).not.toBeInTheDocument();
    rerender(<Card to={to} title={title} description={description} />);
    expect(screen.queryByText(description)).toBeInTheDocument();
  });
});
