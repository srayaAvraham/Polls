import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom";
import { login } from './usersSlice';
import { AppPageHeader } from "../../components/AppPageHeader";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

export function Login() {
    const history = useHistory();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(login(values))
        history.goBack()
    };

    return (
        <div>
        <AppPageHeader title="Login" path={"/"}/>
        <Form onFinish={onFinish}>
            <Form.Item
                {...formItemLayout}
                name="username"
                label="Name"
                rules={[
                    {
                        whitespace: true,
                        required: true,
                        message: 'Please input your name',
                    },
                ]}
            >
                <Input placeholder="Please input your name" />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                name="nickname"
                label="Nickname"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: 'Please input your nickname',
                    },
                    {
                        max:6,
                        message: "Nickname must be a maximum of 6 characters" 
                    }
                ]}
            >
                <Input placeholder="Please input your nickname" />
            </Form.Item>
            <Form.Item {...formTailLayout}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
        </Button>
            </Form.Item>
        </Form>
        </div>
    );
};
