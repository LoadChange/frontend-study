import React from 'react'
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {

    static propTypes = {
        selectAvator: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            icon: ''
        }
    }

    render() {
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,koala,lemur,man,pig,tiger,woman,zebra'
            .split(',').map(text => ({text, icon: require(`../img/${text}.png`)}))
        const gridHeader = this.state.icon
            ? (
                <div>
                    <span>已选择头像</span>
                    <img src={this.state.icon} alt=""/>
                </div>
            )
            : '请选择头像'
        return <div>
            <List renderHeader={() => gridHeader}>
                <Grid
                    onClick={elm => {
                        this.setState({icon: elm.icon})
                        this.props.selectAvator(elm.text)
                    }}
                    data={avatarList}
                    columnNum={5}
                    activeStyle={false}/>
            </List>
        </div>
    }
}

export default AvatarSelector
