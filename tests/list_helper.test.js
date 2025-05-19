const { test, describe } = require('node:test');
const assert = require('node:assert');
const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = dummy(blogs);
  assert.strictEqual(result, 1);
});

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 10,
    __v: 0,
  },
];

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(totalLikes([]), 0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    assert.strictEqual(result, 15);
  });
});

describe('find faborite blog', () => {
  const result = favoriteBlog(listWithOneBlog);
  const expected = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 10,
  };

  assert.deepStrictEqual(result, expected);
});
