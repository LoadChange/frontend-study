import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import {connect} from 'react-redux'
import {getChatId} from "../../redux/util";

@connect(state => state, {getMsgList, sendMsg, recvMsg})
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    handleSubmit() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }

    render() {
        const emoji = '👌 😁 ✅ 😢 😠 ⬇️ ⬅️ ⤴️ 🐴 🐍 🐒 💫 💗 👌 😁 ✅ 😢 😠 ⬇️ ⬅️ ⤴️ 🐴 🐍 🐒 💫 💗 👌 😁 ✅ 😢 😠 ⬇️ ⬅️ ⤴️ 🐴 🐍 🐒 💫 💗 👌 😁 ✅ 😢 😠 ⬇️ ⬅️ ⤴️ 🐴 🐍 🐒 💫 💗 👌 😁 ✅ 😢 😠 ⬇️ ⬅️ ⤴️ 🐴 🐍 🐒 💫 💗 👌 😁 ✅ 😢 😠 ⬇️ ⬅️ ⤴️ 🐴 🐍 🐒 💫 💗'.split(' ').filter(v => v).map(v => ({text: v}))
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        if (!users[userid]) return null
        const {name} = users[userid]
        const chatid = getChatId(userid, this.props.user.id)
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid = chatid)
        return (
            <div id="chat-page">
                <NavBar
                    mode="dark"
                    leftContent={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                >{name}</NavBar>
                <div className="chat-main">
                    {
                        chatmsg.map(v => {
                            const u = users[v.from]
                            const avatar = require(`../img/${u ? u.avatar : 'boy'}.png`)
                            return (
                                v.from === userid
                                    ? (
                                        <List key={v._id}>
                                            <List.Item thumb={avatar}>{v.content}</List.Item>
                                        </List>
                                    )
                                    : (
                                        <List key={v._id}>
                                            <List.Item
                                                extra={<img src={avatar}/>}
                                                className="chat-me">{v.content}</List.Item>
                                        </List>
                                    )
                            )
                        })
                    }
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={text => this.setState({text})}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight: 15}}
                                        onClick={() => this.setState({showEmoji: !this.state.showEmoji}, () => {
                                            setTimeout(() => {
                                                window.dispatchEvent(new Event('resize'))
                                            })
                                        })}>😁</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {
                        this.state.showEmoji
                            ? (
                                <Grid
                                    data={emoji}
                                    columnNum={9}
                                    carouselMaxRow={4}
                                    isCarousel={true}
                                    onClick={({text}) => this.setState({text: `${this.state.text}${text}`})}
                                />
                            )
                            : null
                    }

                </div>
            </div>
        )
    }
}

export default Chat
