import React from 'react';
import { Menu } from 'element-react'
import './style.scss';

class LeftNav extends React.Component {
    render() {
        return (
            <div className="sider">
                <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                    <Menu.Item index="1"><i className="el-icon-menu"></i>首页</Menu.Item>
                    <Menu.SubMenu index="2" title={<span><i className="el-icon-picture"></i>商品</span>}>
                        <Menu.Item index="2-1">商品管理</Menu.Item>
                        <Menu.Item index="2-2">品类管理</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu index="3" title={<span><i className="el-icon-document"></i>订单</span>}>
                        <Menu.Item index="3-1">订单管理</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu index="4" title={<span><i className="el-icon-star-on"></i>用户</span>}>
                        <Menu.Item index="4-1">用户管理</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </div>
        )
    }

    onOpen() {

    }

    onClose() {

    }
}

export default LeftNav