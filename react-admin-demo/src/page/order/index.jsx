import React from 'react';
import {Link} from 'react-router-dom'
import {getList, search} from 'api/OrderApi.jsx'
import {Layout, Form, Input, Select, Table, Button, Pagination, MessageBox, Message} from 'element-react';
import PageTitle from 'component/page-title/index.jsx';

const pageSize = 10

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {label: "订单号", prop: "orderNo"},
            {label: "名称", prop: "receiverName"},
            {label: "状态", prop: "statusDesc"},
            {label: "支付金额", prop: "payment"},
            {label: "创建时间", prop: "createTime"},
            {
                label: "操作", width: 140, render: data => (
                    <div>
                        <Link to={`/order/detail/${data.orderNo}`}>详情</Link>
                    </div>
                )
            }
        ]
        this.state = {
            pageNum: 1,
            form: {
                orderNo: ''
            }
        }
    }

    componentDidMount() {
        this._getOrderList()
    }

    _getOrderList(pageNum) {
        let request = getList
        let param = {
            pageSize,
            pageNum: pageNum || this.state.pageNum
        }
        if (this.state.form.orderNo) {
            request = search
            param = {orderNo: this.state.form.orderNo}
        }
        request(param).then(res => this.setState(Object.assign({}, res.data))).catch(() => this.setState({
            pageNum: 1,
            total: 0,
            list: []
        }))
    }

    onCurrentChange(pageNum) {
        if (pageNum === this.state.pageNum) return
        this._getOrderList(pageNum)
    }

    onSearch() {
        this.setState({
            pageNum: 1
        }, () => this._getOrderList())
    }

    onValueChange(key, value) {
        this.setState({
            form: Object.assign(this.state.form, {[key]: value})
        })
    }

    render() {
        return (
            <div>
                <PageTitle title="订单列表"/>
                <div className="user-list">
                    <Form inline={true} model={this.state.form}
                          onSubmit={this.onSearch.bind(this)}
                          className="demo-form-inline">
                        <Form.Item>
                            <Input placeholder="订单号"
                                   onChange={val => this.onValueChange('orderNo', val)}/>
                        </Form.Item>
                        <Form.Item>
                            <Button nativeType="submit" type="primary">搜索</Button>
                        </Form.Item>
                    </Form>
                    <Table
                        style={{width: '100%'}}
                        columns={this.columns}
                        data={this.state.list}
                        border={true}
                    />
                    <div className="page">
                        <Pagination layout="prev, pager, next, jumper" onCurrentChange={this.onCurrentChange.bind(this)}
                                    total={this.state.total} pageSize={pageSize} currentPage={this.state.pageNum}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderList