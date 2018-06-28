import './style.scss';
import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

class Error extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <PageTitle title="出错了"/>
                <p className="container">找不到该路径，<a href="/">点我返回首页</a></p>
            </div>
        )
    }
}

export default Error