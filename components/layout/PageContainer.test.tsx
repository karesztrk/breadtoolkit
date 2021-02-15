import { render, screen } from '@testing-library/react';
import PageContainer from './PageContainer';
import Meta from './Meta';

describe('PageContainer', () => {
  it('render children', () => {
    const text = 'Hello world';
    render(
      <PageContainer title="">
        <span>{text}</span>
      </PageContainer>,
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });
  it('display the title', () => {
    const title = 'Hello world';
    render(<PageContainer title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('can display subtitle', () => {
    const title = 'Hello';
    const subTitle = 'world';
    render(<PageContainer title={title} subtitle={subTitle} />);
    expect(screen.getByText(title)).toHaveAttribute('title', title);
    expect(screen.getByText(subTitle)).toHaveAttribute('title', subTitle);
  });
  it('hides meta information from the body', () => {
    const name = 'testname';
    const datePublished = new Date().toString();
    const image = ['testimage'];
    const keywords = 'testkeywords';
    const itemList = ['item1', 'item2', 'item3'];
    render(
      <PageContainer
        title=""
        sd={{
          details: {
            name,
            datePublished,
            image,
            keywords,
          },
          itemList,
        }}
      />,
    );
    expect(screen.queryByText(name)).not.toBeInTheDocument();
    expect(screen.queryByText(datePublished)).not.toBeInTheDocument();
    expect(screen.queryByText(image)).not.toBeInTheDocument();
    expect(screen.queryByText(keywords)).not.toBeInTheDocument();
    expect(screen.queryByText(itemList)).not.toBeInTheDocument();
  });
});
