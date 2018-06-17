import React from 'react';
import { Layout, Card, Form, Button, Input, Dialog } from 'element-react';
import { ManageUserLogin } from 'api/UserApi.jsx'
import './style.scss';
import { resolve } from 'url';



class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            dialogText: '',
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入用户名'));
                            } else {
                                callback();
                            }
                        }, trigger: 'change'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'));
                            } else {
                                callback();
                            }
                        }
                    }
                ]
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {
                ManageUserLogin(this.state.form).then(res => {
                    location.href = '/'
                }).catch(error => {
                    this.setState({
                        dialogText: error.msg || error + '',
                        dialogVisible: true
                    })
                })
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    handleReset(e) {
        e.preventDefault();
        this.refs.form.resetFields();
        this.setState({
            form: { username: '', password: '' }
        });
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    render() {
        return (
            <div className="login-panel">
                <Layout.Row gutter="20">
                    <Layout.Col span="14" offset="6">
                        <Card
                            className="box-card"
                            header={
                                <div className="clearfix">
                                    <span style={{ "lineHeight": "36px" }}>Welcome Login</span>
                                </div>
                            }
                        >
                            <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
                                <Form.Item label="用户名" prop="username">
                                    <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')}></Input>
                                </Form.Item>
                                <Form.Item label="密码" prop="password">
                                    <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete="off" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                                    <Button onClick={this.handleReset.bind(this)}>重置</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Dialog
                    title="提示"
                    size="tiny"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <span>{this.state.dialogText}</span>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="primary" onClick={() => this.setState({ dialogVisible: false })}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}

export default Login