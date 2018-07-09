import React from 'react';
import {
    Layout,
    Form,
    Input,
    Button,
    Upload
} from 'element-react';
import CategorySelector from './category-selector.jsx'
import PageTitle from 'component/page-title/index.jsx'

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                region: '',
                date1: null,
                date2: null,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入活动名称', trigger: 'blur'}
                ],
                region: [
                    {required: true, message: '请选择活动区域', trigger: 'change'}
                ],
                date1: [
                    {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                ],
                date2: [
                    {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                ],
                type: [
                    {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                ],
                resource: [
                    {required: true, message: '请选择活动资源', trigger: 'change'}
                ],
                desc: [
                    {required: true, message: '请填写活动形式', trigger: 'blur'}
                ]
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, {[key]: value})
        });
    }

    render() {
        return (
            <div>
                <PageTitle title="添加商品"/>
                <div className="form-box">
                    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"
                          className="demo-ruleForm">
                        <Form.Item label="商品名称" prop="name">
                            <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                        </Form.Item>
                        <Form.Item label="所属描述" prop="name">
                            <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                        </Form.Item>
                        <Form.Item label="所属分类" prop="region">
                            <CategorySelector/>
                        </Form.Item>
                        <Form.Item label="商品价格" prop="name">
                            <Layout.Row gutter="20">
                                <Layout.Col span="8">
                                    <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}
                                           append="元"/>
                                </Layout.Col>
                            </Layout.Row>
                        </Form.Item>
                        <Form.Item label="商品库存" prop="name">
                            <Layout.Row gutter="20">
                                <Layout.Col span="8">
                                    <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}
                                           append="件"/>
                                </Layout.Col>
                            </Layout.Row>
                        </Form.Item>
                        <Form.Item label="商品图片" prop="name">
                            <Upload
                                className="upload-demo"
                                drag
                                action="//jsonplaceholder.typicode.com/posts/"
                                multiple
                                tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
                            >
                                <i className="el-icon-upload"></i>
                                <div className="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="商品详情" prop="name">
                            <Input
                                type="textarea"
                                autosize={{minRows: 4, maxRows: 4}}
                                value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default ProductList