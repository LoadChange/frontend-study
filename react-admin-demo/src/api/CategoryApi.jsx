import request from './base.js'

export function getCategory(categoryId = 0) {
    return request({url: '/manage/category/get_category.do', data: {categoryId}})
}

export function setCategoryName(data) {
    return request({url: '/manage/category/set_category_name.do', data})
}

export function addCategory(data) {
    return request({url: '/manage/category/add_category.do', data})
}