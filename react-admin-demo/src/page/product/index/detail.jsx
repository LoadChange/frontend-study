import React from 'react';
import {
    Layout,
    Form,
    Input,
    Button,
    Upload,
    Notification,
    MessageBox
} from 'element-react';
import CategorySelector from './category-selector.jsx'
import PageTitle from 'component/page-title/index.jsx'
import {saveProductList, getProduct} from 'api/ProductApi.jsx'

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            categoryId: '',
            parentCategoryId: '',
            price: '',
            stock: '',
            subImages: [],
            detail: '',
            fileList: []
        };
    }

    componentDidMount() {
        this.loadProduct()
    }

    loadProduct() {
        if (!this.state.id) {
            this.setState({loading: false})
            return
        }
        getProduct(this.state.id).then(res => {
            for (let key in res.data) {
                if (key === 'imageHost') continue
                if (key === 'subImages') {
                    let subImages = res.data.subImages.split(',').map(uri => {
                        return {uri: uri, url: res.data.imageHost + uri}
                    })
                    this.setState({
                        subImages,
                        fileList: subImages.map(item => {
                            return {name: item.uri, url: item.url, status: 'finished'}
                        })
                    })
                    continue
                }
                if (['price', 'stock'].indexOf(key) >= 0) {
                    this.setState({[key]: res.data[key] + ''})
                    continue
                }
                this.setState({[key]: res.data[key]})
            }
            this.setState({loading: false})
        })
    }

    onCategoryChange(categoryId, parentCategoryId) {
        this.setState({categoryId: categoryId + ''})
        console.log('categoryId:', categoryId, 'parentCategoryId:', parentCategoryId)
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
            subImages: this.state.subImages.filter(item => file.name !== item.uri)
        })
    }

    render() {
        return (
            <div>
                <PageTitle title="预览商品"/>
                {
                    this.state.loading ? null : (
                        <div className="form-box">
                            <Form ref="form" model={this.state} rules={this.state.rules} labelWidth="80"
                                  className="demo-ruleForm">
                                <Form.Item label="商品名称" prop="name">
                                    <span>{this.state.name}</span>
                                </Form.Item>
                                <Form.Item label="商品描述" prop="subtitle">
                                    <span>{this.state.subtitle}</span>
                                </Form.Item>
                                <Form.Item label="所属分类" prop="categoryId">
                                    <CategorySelector
                                        readOnly
                                        categoryId={this.state.categoryId}
                                        parentCategoryId={this.state.parentCategoryId}
                                        onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>
                                </Form.Item>
                                <Form.Item label="商品价格" prop="price">
                                    <Layout.Row>
                                        <Layout.Col span="8">
                                            <span>{this.state.price}元</span>
                                        </Layout.Col>
                                    </Layout.Row>
                                </Form.Item>
                                <Form.Item label="商品库存" prop="stock">
                                    <Layout.Row>
                                        <Layout.Col span="8">
                                            <span>{this.state.stock}件</span>
                                        </Layout.Col>
                                    </Layout.Row>
                                </Form.Item>
                                <Form.Item label="商品图片" prop="subImages">
                                    <Upload
                                        className="preview-upload"
                                        multiple
                                        accept="image/*"
                                        action="/manage/product/upload.do"
                                        name="upload_file"
                                        listType="picture-card"
                                        onSuccess={res => this.onUploadSuccess(res)}
                                        onError={res => this.onUploadError(res)}
                                        onRemove={file => this.onRemoveUploadFile(file)}
                                        fileList={this.state.fileList}
                                    >
                                        <i className="el-icon-plus"/>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="商品详情" prop="detail">
                                    <p dangerouslySetInnerHTML={{__html: this.state.detail}}/>
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