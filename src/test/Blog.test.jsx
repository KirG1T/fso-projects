import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';

test('renders content', () => {
  const blog = {
    url: 'http',
    title: 'test title',
    author: 'kirtest',
    likes: 5,
  };

  const { container } = render(<Blog blog={blog} />);
  // const div = container.querySelector('.blog');
  // expect(div).toHaveTextContent('test title');

  const element = screen.getByText('test title');
  // expect(element).toBeDefined();

  // screen.debug(element);
});
