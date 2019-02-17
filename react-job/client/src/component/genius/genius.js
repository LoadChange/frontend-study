import React from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import UserCard from '../usercard/usercard'

@connect(state => state.chatuser, {getUserList})
class Genius extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return <UserCard userList={this.props.userList}/>
    }
}

export default Genius
