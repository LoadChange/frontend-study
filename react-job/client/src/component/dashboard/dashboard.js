import React from 'react'
import connect from "react-redux/es/connect/connect";
import {Switch} from 'react-router'
import {NavBar} from 'antd-mobile';
import NavLink from '../../component/navlink/navlink'
import Boss from "../../component/boss/boss";
import Genius from "../../component/genius/genius";
import User from "../../component/user/user";
import {Route} from "react-router-dom";
import {getMsgList, recvMsg} from '../../redux/chat.redux'

function Msg() {
    return <h2>Msg</h2>
}

@connect(state => state, {getMsgList, recvMsg})
class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            icon: ''
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render() {
        const user = this.props.user
        const navList = [{
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            component: Boss,
            hide: user.type === 'genius'
        }, {
            path: '/genius',
            text: 'Boss',
            icon: 'job',
            title: 'Boss列表',
            component: Genius,
            hide: user.type === 'boss'
        }, {
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息列表',
            component: Msg
        }, {
            path: '/me',
            text: '我',
            icon: 'user',
            title: '个人中心',
            component: User
        }]
        const {pathname} = this.props.location
        const {title} = navList.find(v => v.path === pathname) || {}
        return (
            <div>
                <NavBar
                    mode="dark"
                    className="fixd-header"
                >{title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {
                            navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component}/>
                            ))
                        }
                    </Switch>
                </div>
                <NavLink data={navList}/>
            </div>
        )
    }
}

export default Dashboard
