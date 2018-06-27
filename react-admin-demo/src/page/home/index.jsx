import './style.scss';
import React from 'react';
import {BaseCount} from 'api/BaseApi.jsx'
import PageTitle from 'component/page-title/index.jsx';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderCount: '-',
            productCount: '-',
            userCount: '-'
        }
    }

    componentDidMount() {
        this._getBaseCount()
    }

    _getBaseCount() {
        BaseCount().then(res => this.setState(res.data))
    }

    render() {
        let boxList = () => {
            let list = [];
            [{
                color: 'warning',
                label: '用户总数',
                getValKey: 'userCount'
            }, {
                color: 'success',
                label: '商品总数',
                getValKey: 'productCount'
            }, {
                color: 'info',
                label: '订单总数',
                getValKey: 'orderCount'
            }].forEach(({color, label, getValKey}) => list.push(
                <div className={`box-item bg-${color}`} key={color}>
                    <label>{label}:</label>
                    <span>{this.state[getValKey]}</span>
                </div>
            ))
            return list
        }
        return (
            <div>
                <PageTitle title="首页"/>
                <div className="box-list">
                    {boxList()}
                </div>
            </div>
        )
    }
}

export default Home