import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from '../components/Togglable';
import '@testing-library/jest-dom';

describe('Togglable component', () => {
  let container;
  const mockHandler = vi.fn();

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="View">
        <button className="toggleBtn" onClick={mockHandler}>
          like
        </button>
      </Togglable>,
    ).container;
  });

  test('renders children only after clicking the button', async () => {
    const hiddenContent = screen.getByText('like');
    expect(hiddenContent).not.toBeVisible();

    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    expect(hiddenContent).toBeVisible();
  });

  test('like button clicked twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const likeBtn = screen.getByText('like');
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
