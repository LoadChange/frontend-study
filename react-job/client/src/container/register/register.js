import React from 'react'
import Logo from '../../component/logo/logo'
import {Redirect} from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio, Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {regisger} from '../../redux/user.redux'
import Form from "../../component/form/form";

const RadioItem = Radio.RadioItem;
const USER_TYPE = [{type: 'genius', label: '牛人'}, {type: 'boss', label: 'BOSS'}]

@connect(
    state => state.user,
    {regisger}
)
@Form
class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    register() {
        this.props.regisger(this.props.state)
    }

    render() {
        return (
            <div>
                {
                    this.props.redirectTo
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
                            type="password"
                            onChange={pwd => this.props.handleChange('pwd', pwd)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={repeatpwd => this.props.handleChange('repeatpwd', repeatpwd)}
                        >确认密码</InputItem>
                        {
                            USER_TYPE.map(item => (
                                <RadioItem
                                    key={item.type}
                                    checked={this.props.state.type === item.type}
                                    onChange={() => this.props.handleChange('type', item.type)}
                                >{item.label}</RadioItem>
                            ))
                        }
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => this.register()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register
