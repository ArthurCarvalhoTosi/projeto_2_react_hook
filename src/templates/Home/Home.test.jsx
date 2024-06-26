import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com/*', async (req, res, ctx) => {
    console.log("Chamada foi interceptada");
    return res(ctx.json(
      [
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  })

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /Load more posts/i });
    expect(button).toBeInTheDocument();

  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title1' })).not.ToBeInTheDocument();

    userEvent.type(search);
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
  });
});

