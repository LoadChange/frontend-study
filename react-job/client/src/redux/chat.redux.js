import io from 'socket.io-client'
import axios from 'axios'

const socket = io('ws://127.0.0.1:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MST_READ = 'MST_READ'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0,

}

export function chat(state = initState, action) {
    let res = state
    switch (action.type) {
        case MSG_LIST:
            res = {
                ...state,
                chatmsg: action.payload.chatmsg,
                users: action.payload.users,
                unread: action.payload.chatmsg.filter(v => !v.read && v.to === action.payload.userid).length
            }
            break
        case MSG_RECV:
            const n = action.payload.data.to === action.payload.userid ? 1 : 0
            res = {
                ...state,
                chatmsg: [...state.chatmsg, action.payload.data],
                unread: state.unread + n
            }
            break
        case MST_READ:
            res = {...state}
            break
    }
    return res
}


const msgList = (chatmsg, users, userid) => ({
    type: MSG_LIST,
    payload: {chatmsg, users, userid}
})
const msgRecv = payload => ({type: MSG_RECV, payload})

export const getMsgList = () => (dispatch, getState) => axios.get('/user/getmsglist').then(res => {
    if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users, userid))
    }
})

export const sendMsg = data => dispatch => socket.emit('sendmsg', data)

export const recvMsg = () => (dispatch, getState) => {
    socket.on('recvmsg', data => {
        const userid = getState().user._id
        return dispatch(msgRecv({data, userid}))
    })
}
