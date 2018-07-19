import request from './base.js'

export function getList(data) {
    return request({url: '/manage/order/list.do', data})
}

export function search(data) {
    return request({url: '/manage/order/search.do', data})
}

export function detail(orderNo) {
    return request({url: '/manage/order/detail.do', data:{orderNo}})
}

export function sendGoods(orderNo) {
    return request({url: '/manage/order/send_goods.do', data:{orderNo}})
}
