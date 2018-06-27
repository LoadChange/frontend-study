import request from './base.js'

export function ManageUserLogin(data) {
    return request({url: '/manage/user/login.do', data})
}

export function ManageUserLogout() {
    return request({url: '/user/logout.do'})
}