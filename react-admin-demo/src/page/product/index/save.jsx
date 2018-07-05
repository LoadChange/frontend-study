import React from 'react';
import {Link} from 'react-router-dom'
import {getProductList, searchProductList, setSaleStatus} from 'api/ProductApi.jsx'
import {Layout, Form, Input, Select, Table, Button, Pagination, MessageBox, Message} from 'element-react';
import PageTitle from 'component/page-title/index.jsx';

const pageSize = 10

class ProductList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PageTitle title="添加商品"/>
                <div>
                    1111
                </div>
            </div>
        )
    }
}

export default ProductList