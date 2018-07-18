import React from 'react';
import {Link} from 'react-router-dom'
import {getCategory, addCategory} from 'api/CategoryApi.jsx'
import {Table, Button, Loading, Form, Input, Select, MessageBox, Message} from 'element-react';
import PageTitle from 'component/page-title/index.jsx';


class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            form: {
                parentId: 0,
                categoryName: ''
            },
            rules: {
                categoryName: {required: true, message: '请输入品类名称', trigger: 'blur'}
            }
        }
    }

    componentDidMount() {
        this._getCategoryList()
    }

    _getCategoryList() {
        this.setState({loading: true}, () => getCategory()
            .then(res => this.setState({list: res.data, loading: false})))
    }

    onChange(key, val) {
        this.setState({
            form: Object.assign(this.state.form, {[key]: val})
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                addCategory(this.state.form).then(res => {
                    Message({
                        type: 'success',
                        message: res.data
                    })
                    location.href = '/#/product/category'
                })
            }
        });
    }

    render() {
        return (
            <div>
                <PageTitle title="新增品类"/>
                <div className="user-list" style={{width: '300px'}}>
                    <Loading text="拼命加载中" loading={this.state.loading}>
                        <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100"
                              className="demo-ruleForm">
                            <Form.Item label="父级" prop="parentId">
                                <Select value={this.state.form.parentId}
                                        onChange={this.onChange.bind(this, 'parentId')}
                                        placeholder="请选择活动区域">
                                    <Select.Option label="跟品类/" value={0}/>
                                    {
                                        this.state.list.map(item => (
                                            <Select.Option
                                                key={item.id}
                                                label={`跟品类/${item.name}`}
                                                value={item.id}/>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="品类名称" prop="categoryName">
                                <Input value={this.state.form.categoryName}
                                       onChange={this.onChange.bind(this, 'categoryName')}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                            </Form.Item>
                        </Form>
                    </Loading>
                </div>
            </div>
        )
    }
}

export default CategoryAdd