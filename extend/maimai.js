// 点赞
var fid = 499421857
setInterval(() => {
  fid++
  $.post(`https://open.taou.com/maimai/feed/v3/like?fid=${fid}&like=1&fr=&u=30301956&channel=www&version=4.0.0&_csrf=Kv8oI7CO-lLNg5tNxNg5mvJEtw6C5PFvK9sM&access_token=1.5edfd92475bda4ebb14c3d9c53207484&uid=%22VW%2Fn8nezcET%2BVz4bCYVtD%2FAirs3A3wL6ApgZu%2Fo1crA%3D%22&token=%22%2BLlTA767vYejWyg4Y4dWcmFjYhLIlntYCJf3OgfrW%2BUSzcRVil17yxfnhuDuv9Tr8CKuzcDfAvoCmBm7%2BjVysA%3D%3D%22`, function (res) {
    console.log(res)
  })
}, 3333)


// 回复
var fid = 499292094
setInterval(() => {
  fid++
  $.post(`https://open.taou.com/maimai/feed/v3/addcmt?fr=&u=30301956&channel=www&version=4.0.0&_csrf=fwKGj8as-hcA40_jIupPnAA6li1YWWiR_XdU&access_token=1.5edfd92475bda4ebb14c3d9c53207484&uid=%22VW%2Fn8nezcET%2BVz4bCYVtD%2FAirs3A3wL6ApgZu%2Fo1crA%3D%22&token=%22%2BLlTA767vYejWyg4Y4dWcmFjYhLIlntYCJf3OgfrW%2BUSzcRVil17yxfnhuDuv9Tr8CKuzcDfAvoCmBm7%2BjVysA%3D%3D%22`, {
    fid: fid,
    u2: 30301956,
    text: '[赞]',
    at_user_info: '{}',
    reply_to: 0
  }, function (res) {
    console.log(res)
  })
}, 3333)