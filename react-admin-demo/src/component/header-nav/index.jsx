import React from 'react';
import store from 'store';
import './style.scss';
import {ManageUserLogout} from 'api/UserApi.jsx';

class HeaderNav extends React.Component {
    constructor(props) {
        super(props)
        const userInfo = store.get('userInfo')
        if (!userInfo) {
            location.href = '/#/login'
            return
        }
        this.state = {userInfo}
    }

    onLogout() {
        ManageUserLogout().then(() => {
            store.clearAll()
            location.href = '/#/login'
        })
    }

    render() {
        return (
            <header className="header-nav">
                <h1>React Admin Demo 管理后台</h1>
                <div className="user-info">
                    <span>{
                        this.state && this.state.userInfo
                            ? this.state.userInfo.username
                            : ''
                    }</span>
                    <i className="divider"/>
                    <a className="logout" href="javascript:void(0);" onClick={this.onLogout}>退出</a>
                </div>
            </header>
        )
    }
}

export default HeaderNav