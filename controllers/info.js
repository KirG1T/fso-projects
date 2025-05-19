const infoRouter = require('express').Router();
const Blog = require('../models/blog');

infoRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.send(`
    <p>Blog List App has info for ${blogs.length} people</p>
    <p>${new Date()}</p>
  `);
});

module.exports = infoRouter;
