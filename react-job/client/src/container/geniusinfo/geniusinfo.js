import React from 'react'
import {NavBar, List, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {Redirect} from "react-router-dom";

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
            desc: ''
        }
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {
                    redirect && path !== redirect
                        ? <Redirect to={redirect}/>
                        : null
                }
                <NavBar mode="dark">牛人完善信息</NavBar>
                <AvatarSelector selectAvator={avatar => this.setState({avatar})}/>
                <List>
                    <InputItem onChange={title => this.setState({title})}>求职岗位</InputItem>
                    <TextareaItem autoHeight title="个人简介" rows={3} onChange={desc => this.setState({desc})}/>
                    <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
                </List>
            </div>
        )
    }
}

export default GeniusInfo
