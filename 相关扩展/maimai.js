// 脉脉PC站 刷刷刷，无聊的代码片段

var url = 'https://open.taou.com/maimai/gossip/v3/addcmt'
var gid = 10228094
var index = 1
setInterval(function() {
  $.post(url, {
    gid: gid,
    text: 'm',
    is_realname: 0,
    u: 30301956,
    channel: 'www',
    version: '4.0.0',
    _csrf: 'fulNB5dt-pPQiFW7ZcyeIXboDWRrTL_FaR9E',
    access_token: '1.fe4bc0a691706a07b0c4fc5f0745fbe6',
    uid: '"VW/n8nezcET+Vz4bCYVtD/Airs3A3wL6ApgZu/o1crA="',
    token: '"rR+dNh6L9ZWDVm3kXB0ItaicH7GKc30dAFEftSV7I3Mvdidhda+M37nuIPRikk+l8CKuzcDfAvoCmBm7+jVysA=="'
  }, function(res) {
    console.log(gid, res.result, index)
  })
  gid++
  index++
}, 5555)
// ========================================================================================================

var page = 0
var index = 1
setInterval(function() {
  var url = 'https://open.taou.com/maimai/gossip/v3/addcmt'
  var listUrl = 'https://maimai.cn/sdk/web/gossip_list?u=30301956&channel=www&version=4.0.0&_csrf=g5DGMZaW-7EhIbmqn2XUnrkLiGckFeYTyE0w&access_token=1.fe4bc0a691706a07b0c4fc5f0745fbe6&uid=%22VW%2Fn8nezcET%2BVz4bCYVtD%2FAirs3A3wL6ApgZu%2Fo1crA%3D%22&token=%22rR%2BdNh6L9ZWDVm3kXB0ItaicH7GKc30dAFEftSV7I3Mvdidhda%2BM37nuIPRikk%2Bl8CKuzcDfAvoCmBm7%2BjVysA%3D%3D%22&page=' + page + '&jsononly=1'
  $.get(listUrl, function(res) {
    var data = res.data
    for (var i = 0; i < data.length; i++) {
      var gid = data[i].id
      setTimeout(function() {
        $.post(url, {
          gid: gid,
          text: 'm',
          is_realname: 0,
          u: 30301956,
          channel: 'www',
          version: '4.0.0',
          _csrf: 'fulNB5dt-pPQiFW7ZcyeIXboDWRrTL_FaR9E',
          access_token: '1.fe4bc0a691706a07b0c4fc5f0745fbe6',
          uid: '"VW/n8nezcET+Vz4bCYVtD/Airs3A3wL6ApgZu/o1crA="',
          token: '"rR+dNh6L9ZWDVm3kXB0ItaicH7GKc30dAFEftSV7I3Mvdidhda+M37nuIPRikk+l8CKuzcDfAvoCmBm7+jVysA=="'
        }, function(res) {
          console.log(gid, res.result, index)
        })
      }, index * 1000)
      index++
    }
  })
  page++
}, 5555)
