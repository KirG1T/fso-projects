import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CreateForm from '../components/CreateForm';

describe('Form component', () => {
  let container;

  beforeEach(() => {
    container = render(<CreateForm user="tester" />).container;
  });

  test('Render form', () => {
    const form = container.querySelector('#form');
    expect(form).toBeDefined();
  });

  // test('is correct form data', async () => {
  //   const createBlog = vi.fn();
  //   const user = userEvent.setup();

  //   await user.type(container.querySelector('input[name="Title"]'), 'React patterns');
  //   await user.type(container.querySelector('input[name="Url"]'), 'http:hey.com');
  // });
});
