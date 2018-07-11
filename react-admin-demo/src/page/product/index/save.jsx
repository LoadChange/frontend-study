import React from 'react';
import {
    Layout,
    Form,
    Input,
    Button,
    Upload,
    Notification
} from 'element-react';
import CategorySelector from './category-selector.jsx'
import PageTitle from 'component/page-title/index.jsx'

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subtitle: '',
            categoryId: '',
            parentCategoryId: '',
            price: '',
            stock: '',
            subImages: [],
            detail: '',
            rules: {
                name: [
                    {required: true, message: '请输入商品名称', trigger: 'blur'}
                ],
                subtitle: [
                    {required: true, message: '请输入商品描述', trigger: 'blur'}
                ],
                categoryId: [
                    {required: true, message: '请选择商品分类', trigger: 'change'}
                ],
                price: [
                    {required: true, message: '请输入商品价格', trigger: 'blur'}
                ],
                stock: [
                    {required: true, message: '请输入商品库存', trigger: 'blur'}
                ],
                subImages: [
                    {type: 'array', required: true, message: '请上传一张图片', trigger: 'change'}
                ],
                detail: [
                    {required: true, message: '请输入商品描述', trigger: 'blur'}
                ]
            }
        };
    }

    onCategoryChange(categoryId, parentCategoryId) {
        this.setState({categoryId: categoryId + ''})
        console.log('categoryId:', categoryId, 'parentCategoryId:', parentCategoryId)
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
        this.setState({[key]: value})
    }

    onUploadSuccess(res) {
        this.setState({
            subImages: [...this.state.subImages, res.data]
        })
    }

    onUploadError(res) {
        Notification.error({
            title: '错误',
            message: res.message || '上传图片失败'
        });
    }

    onRemoveUploadFile(file) {
        this.setState({
            subImages: this.state.subImages.filter(item => file.response.data.uri !== item.uri)
        })
    }

    render() {
        return (
            <div>
                <PageTitle title="添加商品"/>
                <div className="form-box">
                    <Form ref="form" model={this.state} rules={this.state.rules} labelWidth="80"
                          className="demo-ruleForm">
                        <Form.Item label="商品名称" prop="name">
                            <Input value={this.state.name} onChange={this.onChange.bind(this, 'name')}/>
                        </Form.Item>
                        <Form.Item label="商品描述" prop="subtitle">
                            <Input value={this.state.subtitle} onChange={this.onChange.bind(this, 'subtitle')}/>
                        </Form.Item>
                        <Form.Item label="所属分类" prop="categoryId">
                            <CategorySelector
                                onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>
                        </Form.Item>
                        <Form.Item label="商品价格" prop="price">
                            <Layout.Row>
                                <Layout.Col span="8">
                                    <Input value={this.state.price} onChange={this.onChange.bind(this, 'price')}
                                           append="元"/>
                                </Layout.Col>
                            </Layout.Row>
                        </Form.Item>
                        <Form.Item label="商品库存" prop="stock">
                            <Layout.Row>
                                <Layout.Col span="8">
                                    <Input value={this.state.stock} onChange={this.onChange.bind(this, 'stock')}
                                           append="件"/>
                                </Layout.Col>
                            </Layout.Row>
                        </Form.Item>
                        <Form.Item label="商品图片" prop="subImages">
                            <Upload
                                multiple
                                accept="image/*"
                                action="/manage/product/upload.do"
                                name="upload_file"
                                listType="picture-card"
                                onSuccess={res => this.onUploadSuccess(res)}
                                onError={res => this.onUploadError(res)}
                                onRemove={file => this.onRemoveUploadFile(file)}
                            >
                                <i className="el-icon-plus"/>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="商品详情" prop="detail">
                            <Input
                                type="textarea"
                                autosize={{minRows: 4, maxRows: 4}}
                                value={this.state.detail} onChange={this.onChange.bind(this, 'detail')}/>
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