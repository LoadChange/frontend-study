import React from 'react';
import {Link} from 'react-router-dom'
import {getCategory, setCategoryName} from 'api/CategoryApi.jsx'
import {Table, Button, Loading, MessageBox, Message} from 'element-react';
import PageTitle from 'component/page-title/index.jsx';


class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentCategoryId: 0,
            loading: true,
            list: []
        }
        this.columns = [
            {label: "ID", prop: "id"},
            {label: "品类名称", prop: "name"},
            {
                label: "操作", render: item => {
                    return (
                        <div>
                            <Button type="text" onClick={() => this.onUploadName(item)}>修改名称</Button>
                            {item.parentId === 0 ?
                                <Link style={{color: '#20a0ff', marginLeft: '18px'}}
                                      to={`/product/category/${item.id}`}>查看子品类</Link> : null}
                        </div>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        this._getCategoryList()
    }

    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            parentCategoryId = this.props.match.params.categoryId || '0'
        if (oldPath !== newPath) {
            this.setState({parentCategoryId}, () => this._getCategoryList())
        }
    }

    _getCategoryList() {
        this.setState({loading: true}, () => getCategory(this.state.parentCategoryId)
            .then(res => this.setState({list: res.data, loading: false})))

    }

    onUploadName(category) {
        MessageBox.prompt('请输入新的品类名称', '提示', {
            inputPlaceholder: '请输入新的品类名称',
            inputValue: category.name
        }).then(({value}) => {
            setCategoryName({categoryId: category.id, categoryName: value}).then(() => {
                category.name = value
                this.setState({list: this.state.list})
                Message({
                    type: 'success',
                    message: '设置成功，新名称是: ' + value
                })
            })
        })
    }

    render() {
        return (
            <div>
                <PageTitle title="品类列表">
                    <Link to="/product/category/add" className="el-button el-button--danger add-product">添加品类</Link>
                </PageTitle>
                <div className="user-list">
                    <div>
                        <span>父节点ID：{this.state.parentCategoryId}</span>
                        <Link style={{color: '#20a0ff', marginLeft: '18px'}} to="/product/category">返回</Link>
                    </div>
                    <Loading text="拼命加载中" loading={this.state.loading}>
                        <Table
                            style={{width: '100%'}}
                            columns={this.columns}
                            data={this.state.list}
                            border={true}
                        />
                    </Loading>
                </div>
            </div>
        )
    }
}

export default CategoryList