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

module.exports = {
  getList,
  getDetail
};
