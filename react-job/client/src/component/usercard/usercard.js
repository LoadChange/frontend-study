import React from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
    }

    handleClick(item) {
        this.props.history.push(`/chat/${item._id}`)
    }

    render() {
        return (
            <WingBlank>
                <WhiteSpace/>
                {
                    this.props.userList.map(item => (
                        item.avatar
                            ? (
                                <div key={item._id}>
                                    <WhiteSpace/>
                                    <Card onClick={() => this.handleClick(item)}>
                                        <Card.Header
                                            title={item.user}
                                            thumb={require(`../img/${item.avatar}.png`)}
                                            extra={<span>{item.title}</span>}
                                        />

                                        <Card.Body>
                                            {item.type === 'boss' ? (<div>公司：{item.company}</div>) : null}
                                            {item.desc.split('\n').map(row => <p key={row}>{row}</p>)}
                                            {item.type === 'boss' ? (<div>薪资：{item.money}</div>) : null}
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                            : null
                    ))
                }
            </WingBlank>
        )
    }
}

export default UserCard
