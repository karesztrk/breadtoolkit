import React from 'react';
import { render, screen } from '@testing-library/react';
import PageCard from './PageCard';

describe('PageCard', () => {
  it('render children', () => {
    const text = 'Hello world';
    render(
      <PageCard>
        <span>{text}</span>
      </PageCard>,
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
