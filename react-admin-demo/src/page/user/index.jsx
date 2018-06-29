import './style.scss';
import React from 'react';
import {UserList} from 'api/UserApi.jsx'
import {Layout, Table, Button, Pagination} from 'element-react';
import PageTitle from 'component/page-title/index.jsx';

const columns = [
    {label: "ID", prop: "id", width: 80, fixed: 'left'},
    {label: "用户名", prop: "username", width: 100},
    {label: "邮箱", prop: "email", width: 120},
    {label: "手机号", prop: "phone", width: 100},
    {label: "创建时间", prop: "createTime", width: 200},
    {label: "修改时间", prop: "updateTime", width: 200}
]

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this._getUserList()
    }

    _getUserList() {
        UserList().then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className="user-list">
                <PageTitle title="首页"/>
                <Layout.Row>
                    <Layout.Col span="24">
                        <div className="container">
                            <div className="list">
                                <Table
                                    style={{width: '100%'}}
                                    columns={columns}
                                    border={true}
                                />
                            </div>
                            <div className="page">
                                <Pagination layout="prev, pager, next, jumper" total={1000} pageSize={100}
                                            currentPage={5}/>
                            </div>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}

export default User