import React from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

const Item = List.Item
const Brief = Item.Brief;
const alert = Modal.alert;

@connect(state => state.user, {logoutSubmit})
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
    }

    logout() {
        alert('注销', '确认退出登录吗?', [
            {text: '取消'},
            {
                text: '确认', onPress: () => {
                    browserCookies.erase('userid')
                    this.props.logoutSubmit()
                }
            }
        ])
    }

    render() {
        const {avatar, user, type, company, title, desc, money, redirectTo} = this.props
        return user ? (
            <div>
                {
                    redirectTo && redirectTo === '/login'
                        ? <Redirect to={redirectTo}/>
                        : null
                }
                <Result
                    img={<img style={{width: '50px'}} src={require(`../img/${avatar}.png`)}/>}
                    title={user}
                    message={type === 'boss' ? <div>{company}</div> : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {title}
                        {desc.split('\n').map(item => <Brief key={item}>{item}</Brief>)}
                        {money ? <Brief>{money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item onClick={() => this.logout()}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={redirectTo}/>
    }
}

export default User
