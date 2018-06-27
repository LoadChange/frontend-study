import request from './base.js'

export function BaseCount() {
    return request({url: '/manage/statistic/base_count.do'})
}

