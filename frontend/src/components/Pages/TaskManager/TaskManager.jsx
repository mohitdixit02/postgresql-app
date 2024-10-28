import React, { useEffect, useState } from 'react'
import s from "./TaskManager.module.css";
import { Checkbox, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNotification } from '../../Notifications/Notifications';
import { get_tasks, update_status, create_task, delete_task } from '../../api/tasks/tasks';
import Cookies from 'js-cookie';


export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const popNotification = useNotification();

    const user = Cookies.get('user');

    useEffect(() => {
        if (user) {
            get_tasks().then((res) => {
                let data = res.data;
                setTasks(data);
            }).catch((err) => {
                let response = err.response;
                popNotification('error', response.data, '');
            });
        }
    }, []);

    const onChange = (e, item, index) => {

        let checked = e.target.checked;
        let task_id = item.task_id;
        setTasks(tasks.map((elem, i) => {
            if (i === index) {
                return { ...elem, task_status: checked ? "done" : "not done" };
            }
            return elem;
        }));

        const body = {
            task_id: task_id,
            status: checked ? "done" : "not done"
        }

        update_status(body).then((res) => {
            let data = res.data;
            popNotification("success", data.message, '');
        }).catch((error) => {
            let response = error.response;
            popNotification('error', response.data, '');
        });

    };

    const addNewTask = () => {
        let task_name = document.querySelector(".new_task_input_section").value;
        if (task_name === "") {
            popNotification("error", "Task name cannot be empty", '');
            return;
        }
        let new_task = {
            title: task_name,
            status: "not done"
        }

        create_task(new_task).then((res) => {
            let response = res.data;
            popNotification("success", response.message, '');
            get_tasks().then((res) => {
                let data = res.data;
                setTasks(data);
            });

        }).catch((error) => {
            let response = error.response;
            popNotification('error', response.data, '');
        });

        document.querySelector(".new_task_input_section").value = "";
    }

    const deleteTask = (item) => {
        const body = {
            task_id: item.task_id
        }

        delete_task(body).then((res) => {
            let response = res.data;
            popNotification("success", response.message, '');
            get_tasks().then((res) => {
                let data = res.data;
                setTasks(data);
            });
        }).catch((error) => {
            let response = error.response;
            popNotification('error', response.data, '');
        });
    }

    if (user != undefined) {
        return (
            <div className={s['task_manager_parent_holder']}>
                <div className={s['task_manager_parent']}>
                   <div className={s["task_manager_tasks_collection"]}>
                        {tasks.length === 0 && <div className={s["task_manager_no_tasks"]}>No tasks to show</div>}
                        {tasks.map((item, index) => <div key={`task_card_key:${index}`} className={s["task_manager_task_card"]}>
                            <div className={s["task_manager_task_card_left"]}>
                                <Checkbox
                                    checked={item?.task_status === "done" ? true : false}
                                    onChange={(e) => onChange(e, item, index)}
                                >
                                    <div
                                        className={s["task_manager_task_card_left_text"]}
                                        style={item?.task_status === "done" ? { "textDecoration": "line-through" } : {}}
                                    >
                                        {item?.task_name}
                                    </div>
                                </Checkbox>
                            </div>
                            <div className={s["task_manager_task_card_right"]}>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => deleteTask(item)}
                                    placement="topLeft"
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteOutlined />
                                </Popconfirm>
                            </div>
                        </div>
                        )}
                    </div>
                    <hr />
                    <div className={s["task_manager_input_holder"]}>
                        <div>
                            <input type="text" placeholder="Enter Task" className="new_task_input_section" />
                            <button onClick={addNewTask}>Add Task</button>
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
