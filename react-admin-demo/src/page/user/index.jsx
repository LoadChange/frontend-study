import './style.scss';
import React from 'react';
import {UserList} from 'api/UserApi.jsx'
import {Layout, Table, Button, Pagination} from 'element-react';
import PageTitle from 'component/page-title/index.jsx';

const columns = [
    {label: "ID", prop: "id", width: 90, fixed: 'left'},
    {label: "用户名", prop: "username", width: 140},
    {label: "邮箱", prop: "email", width: 220},
    {label: "手机号", prop: "phone", width: 140},
    {label: "安全问题", prop: "question", width: 140},
    {label: "答案", prop: "answer", width: 140},
    {label: "创建时间", prop: "createTime", width: 180},
    {label: "修改时间", prop: "updateTime", width: 180},
    {
        label: "操作",
        prop: "zip",
        fixed: 'right',
        width: 100,
        render: () => {
            return (
                <div>
                    <Button type="text" size="small">查看</Button>
                    <Button type="text" size="small">编辑</Button>
                </div>
            )
        }
    }
]

const pageSize = 10

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1
        }
    }

    componentDidMount() {
        this._getUserList()
    }

    _getUserList(pageNum) {
        UserList({
            pageSize,
            pageNum: pageNum || this.state.pageNum
        }).then(res => this.setState(Object.assign({}, res.data)))
    }

    onCurrentChange(pageNum) {
        if (pageNum === this.state.pageNum) return
        this._getUserList(pageNum)
    }

    render() {
        return (
            <div>
                <PageTitle title="首页"/>
                <div className="user-list">
                    <Table
                        style={{width: '100%'}}
                        columns={columns}
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

export default User