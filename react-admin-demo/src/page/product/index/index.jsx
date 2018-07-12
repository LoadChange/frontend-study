import React from 'react';
import './index.scss'
import {Link} from 'react-router-dom'
import {getProductList, searchProductList, setSaleStatus} from 'api/ProductApi.jsx'
import {Layout, Form, Input, Select, Table, Button, Pagination, MessageBox, Message} from 'element-react';
import PageTitle from 'component/page-title/index.jsx';

const pageSize = 10

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {label: "ID", prop: "id", width: 90},
            {
                label: "商品信息", render: data => (
                    <div>
                        <h5>标题:{data.name}</h5>
                        <h6>描述:{data.subtitle}</h6>
                    </div>
                )
            },
            {label: "价格", width: 140, render: data => (<span>￥{data.price}</span>)},
            {
                label: "状态", width: 140, render: data => (<div>
                    <span>{data.status === 1 ? '在售' : '下架'}</span>
                    <Button
                        size="mini"
                        type={data.status === 1 ? 'danger' : 'warning'}
                        onClick={e => this.onSetProductStatus(e, data)}>{data.status === 1 ? '下架' : '上架'}</Button>
                </div>)
            },
            {
                label: "操作", width: 140, render: data => (
                    <div>
                        <Link to={`/product/detail/${data.id}`}>详情</Link>
                        <span> 　</span>
                        <Link to={`/product/save/${data.id}`}>编辑</Link>
                    </div>
                )
            }
        ]
        this.state = {
            pageNum: 1,
            form: {
                keyword: '',
                type: 'productId'
            }
        }
    }

    componentDidMount() {
        this._getProductList()
    }

    _getProductList(pageNum) {
        let request = getProductList
        let param = {
            pageSize,
            pageNum: pageNum || this.state.pageNum
        }
        if (this.state.listType === 'searchList' && this.state.form.keyword) {
            request = searchProductList
            param[this.state.form.type] = this.state.form.keyword
        }
        request(param).then(res => this.setState(Object.assign({}, res.data))).catch(() => this.setState({
            pageNum: 1,
            total: 0,
            list: []
        }))
    }

    onCurrentChange(pageNum) {
        if (pageNum === this.state.pageNum) return
        this._getProductList(pageNum)
    }

    onSetProductStatus(e, data) {
        let {id, status} = data
        MessageBox.confirm(`确定要${status === 1 ? '下' : '上'}架该商品？`, '提示', {
            type: 'warning'
        }).then(() => {
            setSaleStatus({
                productId: id,
                status: status === 1 ? 2 : 1
            }).then(res => {
                this._getProductList()
                Message({
                    type: 'success',
                    message: res.data
                })
            })
        });
    }

    onSearch() {
        let {keyword} = this.state.form
        let listType = !keyword ? 'list' : 'searchList'
        this.setState({
            listType,
            pageNum: 1
        }, () => this._getProductList())
    }

    onValueChange(key, value) {
        this.setState({
            form: Object.assign(this.state.form, {[key]: value})
        })
    }

    render() {
        return (
            <div>
                <PageTitle title="商品列表">
                    <Link to="/product/save/" className="el-button el-button--danger add-product">添加商品</Link>
                </PageTitle>
                <div className="user-list">
                    <Form inline={true} model={this.state.form}
                          onSubmit={this.onSearch.bind(this)}
                          className="demo-form-inline">
                        <Form.Item>
                            <Select value={this.state.form.type} name="type"
                                    onChange={val => this.onValueChange('type', val)}
                                    placeholder="活动区域">
                                <Select.Option label="按商品ID查询" value="productId"></Select.Option>
                                <Select.Option label="按商品名称查询" value="productName"></Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="关键词"
                                   onChange={val => this.onValueChange('keyword', val)}></Input>
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

export default ProductList