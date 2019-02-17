const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/job-chat'
mongoose.connect(DB_URL)

const models = {
    user: {
        user: {type: String, require: true},
        pwd: {type: String, require: true},
        type: {type: String, require: true},
        avatar: {type: String, require: true},
        desc: {type: String},
        title: {type: String},
        company: {type: String},
        money: {type: String},
    },
    chat: {
        chat_id: {type: String, require: true},
        from: {type: String, require: true},
        to: {type: String, require: true},
        content: {type: String, require: true, default: ''},
        read: {type: Boolean, default: false},
        create_time: {type: Number, default: new Date().getTime()},
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}
