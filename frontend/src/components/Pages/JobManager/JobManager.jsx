import React from 'react'
import s from "./JobManager.module.css";
import { Form, Input, Button, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Options = [
    {
        value: 'all',
        label: 'All'
    },
    {
        value: 'preparing',
        label: 'Preparing'
    },
    {
        value: 'interview',
        label: 'Interview'
    },
    {
        value: 'selected',
        label: 'Selected'
    },
    {
        value: 'rejected',
        label: 'Rejected'
    }
];

export default function JobManager() {
    const onFinishFailed = (errorInfo) => { }
    const initiateLogin = (values) => { }
    return (
        <div className={s['job_manager_parent_holder']}>
            <div className={s['job_manager_parent']}>

                {/* Job Form */}
                <div className={s['job_manager_form_holder']}>
                    <h2>Post a Job</h2>
                    <div className={s['job_manager_form']}>
                        <Form
                            name="job form"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 19,
                            }}
                            style={{
                                width: 800,
                            }}
                            onFinish={initiateLogin}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Company Name"
                                name="company_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the company name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Position"
                                name="position"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your position!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Current Status"
                                name="current_status"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the status!',
                                    },
                                ]}
                            >
                                <Select placeholder="Select Status" options={Options} />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 4,
                                    span: 16,
                                }}
                            >
                                <Button style={{ "marginTop": "5px" }} type="primary" htmlType="submit">
                                    Add
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                {/* Job list */}
                <div className={s["job_list_container_holder"]}>
                    <div className={s["job_list_container"]}>
                        <div className={s['job_list_container_top']}>
                            <h2>View your Jobs</h2>
                            <Select defaultValue={Options[0]} style={{'width':'180px'}} options={Options} />
                        </div>
                        <div className={s['job_list_data']}>
                            {[0,0,0,0].map((item, index) => {
                                return (
                                    <div className={s['job_list_data_item']} key={index}>
                                        <div className={s['job_list_data_item_left']}>
                                            <h3>Company Name</h3>
                                            <p>Position</p>
                                        </div>
                                        <div className={s['job_list_data_item_right']}>
                                            <p>Status</p>
                                            <div className={s["job_list_item_button"]}>
                                                <EditOutlined />
                                                <DeleteOutlined />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
