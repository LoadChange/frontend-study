import React from 'react';
import './style.scss';

class HeaderNav extends React.Component {
    render() {
        return (
            <header className="header-nav">
                <h1>React Admin Demo 管理后台</h1>
                <div className="user-info">
                    <span>用户名</span>
                    <i className="divider"></i>
                    <a className="logout" href="#">退出</a>
                </div>
            </header>
        )
    }
}

export default HeaderNav