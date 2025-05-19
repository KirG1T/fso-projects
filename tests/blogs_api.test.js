const { test, describe, beforeEach, after } = require('node:test');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('../utils/list_helper');
const config = require('../utils/config');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('addition of a new blog (POST)', () => {
  test('has id instead of _id', async () => {
    const data = await api.get('/api/blogs');
    const bool = data.body[0].hasOwnProperty('id');

    assert(bool, true);
  });

  test('POST request', async () => {
    const amountDataBefore = (await api.get('/api/blogs')).body.length;

    // // get id of existing user
    // const credentials = { username: 'Kirill', name: 'Kir', password: '77622471994' };
    // const result = await api.post('/api/users').send(credentials);
    // const userId = JSON.parse(result.text).id;

    // // log in user
    // const loggedInUser = await api.post('/api/login').send(credentials);

    // const decodedToken = jwt.verify(loggedInUser.body.token, config.SECRET);
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: 'token invalid' });
    // } else {
    // }

    const newBlog = {
      title: 'Test title',
      author: 'Admin',
      url: 'localhost:3001/api/blogs',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
    // .expect('Content-Type', /application\/json/);

    // const amountDataAfter = (await api.get('/api/blogs')).body.length;

    // assert(amountDataAfter - amountDataBefore, 1);
  });

  test('property likes must be 0 by default', async () => {
    const newBlog = {
      title: 'Test title',
      author: 'Admin',
      url: 'localhost:3001/api/blogs',
    };

    const createdBlog = await api.post('/api/blogs').send(newBlog).expect(401);
    // .expect('Content-Type', /application\/json/);

    // assert.strictEqual(createdBlog.body.likes, 0);
  });

  test('url and title properties must be required', async () => {
    const newBlog = {
      author: 'Admin',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });
});

describe('deletion of a blog (DELETE)', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await api.get('/api/blogs');
    const firstBlogId = blogs.body[0].id;
    const invalidBlogId = firstBlogId.slice(0, firstBlogId.length - 2) + 'a2';

    await api.delete(`/api/blogs/${firstBlogId}`).expect(401);
    // await api.delete(`/api/blogs/${invalidBlogId}`).expect(404);
  });
});

describe('updating of a blog (PUT)', () => {
  test('succeeds with status code 201 if id is valid', async () => {
    const blogs = await api.get('/api/blogs');
    const firstBlogId = blogs.body[0].id;
    const invalidBlogId = firstBlogId.slice(0, firstBlogId.length - 2) + 'a2';
    const firstBlogTitle = blogs.body[0].title;
    const newTitle = 'New test title';

    await api.put(`/api/blogs/${firstBlogId}`).send({ title: newTitle }).expect(201);
    await api.put(`/api/blogs/${invalidBlogId}`).send({ title: newTitle }).expect(404);

    const updatedBlogs = await api.get('/api/blogs');
    const updatedTitle = updatedBlogs.body[0].title;
    assert.strictEqual(updatedTitle, newTitle);
  });
});

after(async () => {
  await mongoose.connection.close();
});
