const loginCheck = ({username, password}) => {
  if (username === 'zhangsanfeng' && password === '123') {
    return true;
  }
  return false;
};

module.exports = {
  loginCheck
};
