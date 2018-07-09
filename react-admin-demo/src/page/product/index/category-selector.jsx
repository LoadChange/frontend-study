import React from 'react';
import {
    Layout,
    Select,
    Message
} from 'element-react';
import {getCategoryList} from 'api/ProductApi.jsx'

class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            firstCategoryLoading: true,
            secondCategoryList: [],
            secondCategoryId: 0,
            secondCategoryLoading: false
        }
    }

    componentDidMount() {
        this.loadFirstCategory()
    }

    loadFirstCategory() {
        getCategoryList()
            .then(res => this.setState({firstCategoryList: res.data, firstCategoryLoading: false}))
            .catch(errMsg => Message.error(errMsg))
    }

    loadSecondCategoryList() {
        getCategoryList(this.state.firstCategoryId)
            .then(res => this.setState({secondCategoryList: res.data, secondCategoryLoading: false}))
            .catch(errMsg => Message.error(errMsg))
    }

    onChange(type, categoryId) {
        if (type === 'first') {
            this.setState({
                firstCategoryId: categoryId,
                secondCategoryList: [],
                secondCategoryLoading: true,
                secondCategoryId: 0,
            }, () => this.loadSecondCategoryList())
        }
    }

    render() {
        return (<Layout.Row gutter="20">
            <Select value={this.state.firstCategoryId} placeholder="请选择一级分类"
                    onChange={this.onChange.bind(this, 'first')}
                    loading={this.state.firstCategoryLoading}
            >
                {
                    this.state.firstCategoryList.map(({name, id}) => (
                        <Select.Option label={name} value={id} key={id}/>
                    ))
                }
            </Select>
            <div style={{width: '30px', display: 'inline-block'}}/>
            <Select value={this.state.secondCategoryId}
                    placeholder="请选择二级分类"
                    loading={this.state.secondCategoryLoading}>
                {
                    this.state.secondCategoryList.map(({name, id}) => (
                        <Select.Option label={name} value={id} key={id}/>
                    ))
                }
            </Select>
        </Layout.Row>)
    }
}

export default CategorySelector