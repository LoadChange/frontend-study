import axios from 'axios'
import {getRedirectPath} from './util'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

const errorMsg = msg => ({msg, type: ERROR_MSG})
const authSuccess = data => ({type: AUTH_SUCCESS, payload: data})
export const logoutSubmit = () => ({type: LOGOUT})

export function user(state = initState, action) {
    let res = state
    switch (action.type) {
        case AUTH_SUCCESS:
            res = {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload, pwd: null}
            break
        case LOAD_DATA:
            res = {...state, ...action.payload}
            break
        case ERROR_MSG:
            res = {...state, msg: action.msg}
            break
        case LOGOUT:
            res = {...initState, redirectTo: '/login'}
            break
    }
    return res
}

export function regisger({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => axios.post('/user/register', {user, pwd, type}).then(res => {
        if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess({user, pwd, type}))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    })
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => axios.post('/user/login', {user, pwd}).then(res => {
        if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    })
}

export const loadData = userinfo => ({type: LOAD_DATA, payload: userinfo})

export const update = data => dispatch => axios.post('/user/update', data).then(res => {
    if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
    } else {
        dispatch(errorMsg(res.data.msg))
    }
})


export const userinfo = ({user, pwd}) => dispatch => axios.get('/user/info').then(res => {
    if (res.status === 200) {
        if (res.data.code === 0) {
        } else {
            this.props.loadData(res.data.data)
            this.props.history.push('/login')
        }
    }
})
