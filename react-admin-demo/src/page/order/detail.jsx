import React from 'react';
import {
    Layout,
    Form,
    Input,
    Button,
    Upload,
    Notification,
    MessageBox,
    Table,
    Message
} from 'element-react';
import PageTitle from 'component/page-title/index.jsx'
import {detail, sendGoods} from 'api/OrderApi.jsx'

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orderNo: this.props.match.params.orderNo,
            orderInfo: {}
        };
        this.columns = [{
            label: "商品图片",
            render: data => <img src={`${this.state.orderInfo.imageHost}${data.productImage}`}/>
        }, {
            label: "商品信息",
            prop: "productName"
        }, {
            label: "单价",
            prop: "currentUnitPrice"
        }, {
            label: "数量",
            prop: "quantity"
        }, {
            label: "总价",
            prop: "totalPrice"
        }]
    }

    componentDidMount() {
        this.loadOrder()
    }

    loadOrder() {
        if (!this.state.orderNo) {
            this.setState({loading: false})
            return
        }
        detail(this.state.orderNo).then(res => {
            this.setState({loading: false, orderInfo: res.data})
        })
    }

    onSendGoods() {
        MessageBox.confirm('是否该订单已经发货?', '提示', {
            type: 'warning'
        }).then(() => {
            sendGoods(this.state.orderInfo.orderNo).then(res => Message({
                type: 'success',
                message: res.data
            })).catch(res => Message({
                type: 'error',
                message: res.msg
            }))
        })
    }

    render() {
        return (
            <div>
                <PageTitle title="订单详情"/>
                {
                    this.state.loading ? null : (
                        <div className="form-box">
                            <Form ref="form" model={this.state} rules={this.state.rules} labelWidth="86">
                                <Form.Item label="订单号">
                                    <span>{this.state.orderInfo.orderNo}</span>
                                </Form.Item>
                                <Form.Item label="创建时间">
                                    <span>{this.state.orderInfo.createTime}</span>
                                </Form.Item>
                                <Form.Item label="订单状态">
                                    <span style={{marginRight: '20px'}}>{this.state.orderInfo.statusDesc}</span>
                                    {
                                        this.state.orderInfo.status === 20
                                            ? <Button type="primary" size="mini"
                                                      onClick={() => this.onSendGoods()}>立即发货</Button>
                                            : null
                                    }
                                </Form.Item>
                                <Form.Item label="支付方式">
                                    <span>{this.state.orderInfo.paymentTypeDesc}</span>
                                </Form.Item>
                                <Form.Item label="订单金额">
                                    <span>{this.state.orderInfo.payment}</span>
                                </Form.Item>
                                <Form.Item label="商品列表">
                                    <Table
                                        style={{width: '100%'}}
                                        columns={this.columns}
                                        data={this.state.orderInfo.orderItemVoList}
                                        border={true}
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ProductList