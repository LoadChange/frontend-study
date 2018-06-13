import React from 'react';
import { Menu } from 'element-react'
import './style.scss';

class LeftNav extends React.Component {
    render() {
        return (
            <div className="sider">
                <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                    <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                        <Menu.ItemGroup title="分组一">
                            <Menu.Item index="1-1">选项1</Menu.Item>
                            <Menu.Item index="1-2">选项2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="分组2">
                            <Menu.Item index="1-3">选项3</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                    <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item>
                    <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item>
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