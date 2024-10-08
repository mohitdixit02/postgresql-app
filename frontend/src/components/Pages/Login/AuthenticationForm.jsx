import React from 'react';
import Cookies from 'js-cookie';
import { Modal, Tabs, Button, Form, Input } from 'antd';
import { useNotification } from '../../Notifications/Notifications';
import {loginApi} from "../../api/auth/auth";


const onFinish = (values) => {
    console.log('Success:', values);
}
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function AuthenticationForm({ visible, setVisible }) {
    const popNotification = useNotification();

    const initiateLogin = (values) => {
        const data = loginApi(values);
        data.then((res) => {
            let data = res.data;
            Cookies.set('token', data.token);
            Cookies.set('user', data.name);
            popNotification("success", data.message, '');
            setVisible(false);
            setTimeout(() => { window.location.reload(); }, 2000);  
        }).catch((error) => {
            const response = error.response;
            popNotification('error', response.data, '');
            Cookies.remove('token');
            Cookies.remove('user');
        });
    };

    const initiateSignin = (values) => {
        // const data = SigninAPI(values);
        // data.then((res) => {
        //     let status = res.status;
        //     let message = res.message;
            
        //     popNotification(status, message, '');
        //     if (status === 'success') {
        //         setVisible(false);
        //     }
        // })
    };

    return (
        <>
            <Modal
                title=""
                centered
                destroyOnClose
                open={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={[]}
                style={{ fontSize: '12px' }}
            >
                <Tabs
                    defaultActiveKey="1"
                    centered
                    items={
                        [{
                            label: `Login`,
                            key: '1',
                            children: <Form
                                name="Login form"
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 700,
                                }}
                                onFinish={initiateLogin}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 10,
                                        span: 16,
                                    }}
                                >
                                    <Button style={{ "marginTop": "20px" }} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>,
                        },
                        {
                            label: `Signin`,
                            key: '2',
                            children: <Form
                                name="Signin form"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 700,
                                }}
                                onFinish={initiateSignin}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Full Name"
                                    name="fullname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 10,
                                        span: 16,
                                    }}
                                >
                                    <Button style={{ "marginTop": "20px" }} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>,
                        },
                        ].map((key, i) => {
                            return {
                                label: key.label,
                                key: key.key,
                                children: key.children,
                            };
                        })}
                />
            </Modal>
        </>
    )
}