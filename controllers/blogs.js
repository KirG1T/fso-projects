const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).send({ error: 'Blog with the given ID not found' });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  if (!request.token) {
    return response.status(401).json({ error: 'Token missing' });
  }

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).send({ error: 'Blog with the given ID not found' });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(403).json({ error: 'You do not have permission to delete this blog.' });
  }

  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (deletedBlog) {
    response.status(204).end();
  } else {
    response.status(404).send({ error: 'Blog with the given ID not found' });
  }
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const existingBlog = await Blog.find({ title });
  if (existingBlog.length > 0) {
    return response.status(400).json({
      error: 'Title must be unique',
    });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  });

  const newBlog = await blog.save();

  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  response.status(201).json(newBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', { username: 1, name: 1 });

  if (updatedBlog) {
    response.status(201).json(updatedBlog);
  } else {
    response.status(404).send({ error: 'Blog with the given ID not found' });
  }
});

module.exports = blogsRouter;
