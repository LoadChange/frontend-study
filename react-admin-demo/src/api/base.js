import axios from 'axios';
import qs from 'qs';

const instance = axios.create()

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.interceptors.response.use(function (res) {
    let json = res.data
    console.log('json', json)
    if (json.status === 10) {
        doLogin()
        return Error('未登录')
    }
    if (json.status === 0) {
        return Promise.resolve(json)
    }else{
        return Promise.reject(json);
    }
}, function (err) {
    return Promise.reject(err);
})

function doLogin() {
    let url = '/#/login'
    if (!location.href.match('login')) {
        location.href = `${url}?redirect=${encodeURIComponent(location.hash)}`
    }
    location.href = url
}

export default function request({ method, url, data, params }) {
    return instance({
        method: method || 'post',
        url,
        data: data ? (qs.stringify(data)) : {},
        params: params || {}
    })
}