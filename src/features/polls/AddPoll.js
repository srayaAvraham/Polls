import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Form, Input, Button, } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addPoll } from './pollsListSlice';
import { nanoid } from 'nanoid';
import { selectUser } from '../users/usersSlice';
import { Redirect } from "react-router-dom";
import { AppPageHeader } from "../../components/AppPageHeader";
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

export const AddPoll = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const [form] = Form.useForm();
    const pollObj = ({ question, choices }) => {
        const id = nanoid()
        return {
            id, question, choices: choices.map((choice, i) => {
                return {
                    id: i,
                    vote: 0,
                    choice
                }
            })
        }
    }
    const onFinish = (values) => {
        //const poll = pollObj(values)
        dispatch(addPoll({...values, user}))
        form.resetFields();
    };

    if (!user) {
        return <Redirect push to={'/login'} />
    }
    return (
        <div>
            <AppPageHeader title="Add poll" path={"/"}/>
            <Form
                name="dynamic_form_item"
                onFinish={onFinish}
                initialValues={{ choices: ["", ""] }}
                form={form}
            >
                <Form.Item
                {...formItemLayout}
                    label="Question"
                    name="question"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please input your question!',
                        },
                    ]}
                >
                    <Input placeholder="Enter question" style={{ width: "90%" }} />
                </Form.Item>
                <Form.List name="choices">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        required={true}
                                        key={field.key}
                                        label="Choice"
                                        {...formItemLayout}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={["onChange", "onBlur"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                        "Please input choice or delete this field."
                                                }
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="Enter choice"
                                                style={{ width: "90%" }}
                                            />
                                        </Form.Item>
                                        {fields.length > 2 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{ margin: "0 8px" }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item {...formTailLayout}>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}

                                    >
                                        <PlusOutlined /> Add field
              </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
                <Form.Item {...formTailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
      </Button>
                </Form.Item>
            </Form>

        </div>
    )
}