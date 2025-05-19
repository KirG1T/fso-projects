const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  const top = blogs.sort((a, b) => b.likes - a.likes)[0];
  return { title: top.title, author: top.author, likes: top.likes };
};

const initialBlogs = [
  {
    title: 'First title',
    author: 'Kirill',
    url: 'localhost:3001/api/blogs',
    likes: 5,
  },
  {
    title: 'Good Title!!!',
    author: 'Mon',
    url: 'localhost:300',
    likes: 1,
  },
  {
    title: 'Some title',
    author: 'Kirill',
    url: 'localhost:3001/api/blogs',
    likes: 15,
  },
  {
    title: 'Tessst title',
    author: 'Vasya',
    url: 'localhost:3001/api/blogs',
    likes: 1,
  },
];

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  initialBlogs,
};
