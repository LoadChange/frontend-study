import React from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import UserCard from "../usercard/usercard";

@connect(state => state.chatuser, {getUserList})
class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        this.props.getUserList('genius')
    }

    render() {
        return <UserCard userList={this.props.userList}/>
    }
}

export default Boss
