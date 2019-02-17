const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')
// Chat.remove({}, function () {})
io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('-')
        Chat.create({chatid, from, to, content: msg}, function (err, doc) {
            console.log(Object.assign({}, doc._doc))
            socket.emit('recvmsg', Object.assign({}, doc._doc), function (data) {
                console.log('data', data)
            })
        })
    })
})


const userRouter = require('./user')


app.use(bodyParser())
app.use(cookieParser())

app.use('/user', userRouter)

server.listen(9093, function () {
    console.log('Node app strat at port 9093')
})
