import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from "react-router-dom";
import Form from '../../component/form/form'

@connect(
    state => state.user,
    {login}
)
@Form
class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    register() {
        this.props.history.push('/register')
    }

    login() {
        this.props.login(this.props.state)
    }

    render() {
        return (
            <div>
                {
                    this.props.redirectTo && this.props.redirectTo !== '/login'
                        ? <Redirect to={this.props.redirectTo}/>
                        : null
                }
                <Logo/>
                <WingBlank>
                    <List>
                        {
                            this.props.msg
                                ? <p className="error-msg">{this.props.msg}</p>
                                : null
                        }
                        <InputItem
                            onChange={user => this.props.handleChange('user', user)}
                        >用户名</InputItem>
                        <InputItem
                            onChange={pwd => this.props.handleChange('pwd', pwd)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => this.login()}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => this.register()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login
