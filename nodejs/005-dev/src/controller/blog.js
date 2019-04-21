const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      creatTime: 0,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题A',
      content: '内容A',
      creatTime: 0,
      author: 'zhangsan'
    }
  ];
};
const getDetail = id => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    creatTime: 0,
    author: 'zhangsan'
  };
};

const newBlog = blog => {
  console.log('new', blog);
  return { id: 3 };
};

const updateBlog = (id, blog) => {
  console.log('update', id, blog);
  return true;
};
const deleteBlog = id => {
  console.log('delete', id);
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
};
