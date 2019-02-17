const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {pwd: 0, __v: 0}

Router.get('/list', function (req, res) {
    const type = req.query.type
    User.find({type}, function (err, data) {
        return res.json({code: 0, data})
    })
})

Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
        const userModel = new User({user, pwd: md5Pwd(pwd), type})
        userModel.save(function (e, data) {
            if (e) return res.json({code: 1, msg: '数据库查询错误'})
            if (data) {
                const {user, type, _id} = data
                res.cookie('userid', data._id)
                return res.json({code: 0, data: {user, type, _id}})
            }
        })
    })

})

Router.post('/login', function (req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (e, data) {
        if (!data) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        res.cookie('userid', data._id)
        return res.json({code: 0, data})
    })
})

Router.post('/update', function (req, res) {
    const {userid} = req.cookies
    if (!userid) return json.dumps({code: 1})
    const body = req.body
    User.findByIdAndUpdate({_id: userid}, body, function (e, data) {
        data = Object.assign({}, {
            user: data.user,
            type: data.type
        }, body)
        if (e) return res.json({code: 1, msg: '数据库查询错误'})
        if (data) return res.json({code: 0, data})
    })
})

Router.get('/info', function (req, res) {
    const {userid} = req.cookies
    User.findOne({_id: userid}, _filter, function (e, data) {
        if (e) return res.json({code: 1, msg: '数据库查询错误'})
        if (data) return res.json({code: 0, data})
    })
})

Router.get('/getmsglist', function (req, res) {
    const {userid} = req.cookies
    User.find({}, function (e, userdoc) {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        // '$or': [{'from': userid, 'to': userid}]
        Chat.find({}, function (err, doc) {
            if (!err) {
                return res.json({code: 0, msgs: doc, users})
            }
        })
    })
})

function md5Pwd(pwd) {
    const salt = '1537176834824'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
