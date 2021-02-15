import { render, screen } from '@testing-library/react';
import Card from './Card';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

describe('Card', () => {
  it('can be rendered without error', () => {
    const title = 'title';
    const to = 'to';
    render(<Card to={to} title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('display a description', () => {
    const title = 'title';
    const to = 'to';
    const description = 'description';
    mockAllIsIntersecting(true);
    const { rerender } = render(<Card to={to} title={title} />);
    expect(screen.queryByText(description)).not.toBeInTheDocument();
    rerender(<Card to={to} title={title} description={description} />);
    expect(screen.queryByText(description)).toBeInTheDocument();
  });
  it('hides lazy background images', () => {
    const title = 'title';
    const to = 'to';
    const image = 'imagePath';
    mockAllIsIntersecting(true);
    render(<Card to={to} title={title} image={image} />);
    expect(screen.getByTestId('card')).toHaveAttribute(
      'style',
      'filter: blur(20px);',
    );
  });
});
