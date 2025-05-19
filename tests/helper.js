const loginUser = async (page, username, password) => {
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByText('blogs').waitFor({ state: 'visible', timeout: 10000 });
};

const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'new blog' }).click();
  await page.getByTestId('title').fill(content.title);
  await page.getByTestId('url').fill(content.url);
  await page.getByTestId('createBtn').click();
};

export { loginUser, createBlog };
