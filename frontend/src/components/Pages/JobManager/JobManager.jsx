import React, { useState, useEffect } from 'react'
import s from "./JobManager.module.css";
import { Form, Input, Button, Select, Popconfirm, Spin } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { get_jobs, create_job, update_job, delete_job } from '../../api/jobs/jobs';
import { useNotification } from '../../Notifications/Notifications';
import Cookies from 'js-cookie';

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

const backgroundColorType = {
    'preparing': '#ed8e4e',
    'interview': '#6452ff',
    'selected': '#2cb852',
    'rejected': '#ff0000'
}

export default function JobManager() {
    const popNotification = useNotification();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusType, setStatusType] = useState('all');
    const [formStatus, setFormStatus] = useState('add');
    const [activeJobID, setActiveJobID] = useState(null);
    const [form] = Form.useForm();
    const [formInitialValues, setFormInitialValues] = useState({});

    const user = Cookies.get("user");

    const onFinishFailed = (errorInfo) => { }

    useEffect(() => {
        if (user) {
            get_jobs(statusType).then((res) => {
                let data = res.data;
                setJobs(data);
            }).catch((err) => {
                let response = err.response;
                popNotification('error', response.data, '');
            });
        }
    }, [statusType]);

    useEffect(() => {
        if (formStatus === "update") {
            setFormInitialValues(form.getFieldsValue());
        }
    }, [formStatus]);

    const createJobFunction = (values) => {
        setLoading(true);
        create_job(values).then((res) => {
            let data = res.data;
            popNotification("success", data.message, '');
            form.resetFields();
            get_jobs(statusType).then((res) => {
                let data = res.data;
                setJobs(data);
                setLoading(false);
            });

        }).catch((error) => {
            let response = error.response;
            popNotification('error', response.data, '');
            setLoading(false);
        });
    }

    const updateJobFunction = (values) => {
        setLoading(true);
        let changes = {};
        for (let i of Object.keys(values)) {
            if (values[i] !== formInitialValues[i]) {
                if (i === 'status') {
                    changes['job_status'] = values[i];
                }
                else {
                    changes[i] = values[i];
                }
            }
        }

        if (Object.keys(changes).length === 0) {
            popNotification('error', 'No changes made', 'Make some changes and try again');
            setLoading(false);
            return;
        }

        const body = {
            changes: changes,
            job_id: activeJobID
        }
        update_job(body).then((res) => {
            let data = res.data;
            popNotification("success", data.message, '');
            form.resetFields();
            setFormStatus('add');
            get_jobs(statusType).then((res) => {
                let data = res.data;
                setJobs(data);
                setLoading(false);
            });
        }).catch((error) => {
            let response = error.response;
            popNotification('error', response.data, '');
            setLoading(false);
        })
    };

    const deleteItem = (item) => {
        delete_job({ job_id: item.job_id }).then((res) => {
            let data = res.data;
            popNotification("success", data.message, '');
            get_jobs(statusType).then((res) => {
                let data = res.data;
                setJobs(data);
            });
        }).catch((error) => {
            let response = error.response;
            popNotification('error', response.data, '');
        });
    };

    const updateItem = (item) => {
        setFormStatus('update');
        form.setFieldsValue({
            company_name: item.company_name,
            position: item.position,
            status: item.status
        });
        setActiveJobID(item.job_id);
    };

    if (user != undefined) {
        return (
            <div className={s['job_manager_parent_holder']}>
                <div className={s['job_manager_parent']}>

                    {/* Job Form */}
                    <div className={s['job_manager_form_holder']}>
                        <h2>Post a Job</h2>
                        <div className={s['job_manager_form']}>
                            <Form
                                form={form}
                                name="job form"
                                layout='vertical'
                                labelCol={{
                                    span: 15,
                                }}
                                wrapperCol={{
                                    span: 130,
                                }}
                                style={{
                                    width: 700,
                                }}
                                onFinish={formStatus === 'add' ? createJobFunction : updateJobFunction}
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
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Current Status"
                                    name="status"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select the status!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select Status" options={Options.slice(1)} />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 4,
                                        span: 16,
                                    }}
                                >
                                    {loading ?
                                        <Spin/>
                                        :
                                        <Button style={{ "marginTop": "5px" }} type="primary" htmlType="submit">
                                            {formStatus === 'add' ? 'Add Job' : 'Update Job'}
                                        </Button>
                                    }
                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                    {/* Job list */}
                    <div className={s["job_list_container_holder"]}>
                        <div className={s["job_list_container"]}>
                            <div className={s['job_list_container_top']}>
                                <h2>View your Jobs</h2>
                                <Select defaultValue={statusType} style={{ 'width': '180px' }} options={Options} onChange={(value) => setStatusType(value)} />
                            </div>
                            <div className={s['job_list_data']}>
                                {jobs?.length === 0 && <div className={s["job_list_no_jobs"]}>No jobs to show</div>}
                                {jobs?.map((item, index) => {
                                    return (
                                        <div className={s['job_list_data_item']} key={`company_type_object_${index}`}>
                                            <div className={s['job_list_data_item_left']}>
                                                <h3>{item?.company_name}</h3>
                                                <p>{item?.position}</p>
                                            </div>
                                            <div className={s['job_list_data_item_right']}>
                                                <p style={{ 'backgroundColor': backgroundColorType[item?.status] }}>
                                                    {item?.status[0].toUpperCase() + item?.status.slice(1)}
                                                </p>
                                                <div className={s["job_list_item_button"]}>
                                                    <EditOutlined onClick={() => updateItem(item)} className={s["job_list_item_update"]} />
                                                    <Popconfirm
                                                        title="Delete the task"
                                                        description="Are you sure to delete this task?"
                                                        onConfirm={() => deleteItem(item)}
                                                        placement="topLeft"
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <DeleteOutlined className={s["job_list_item_delete"]} />
                                                    </Popconfirm>
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
    else {
        return (
            <div className={s["not_found_div"]}>
                Please login to view this page
            </div>
        )
    }
}
