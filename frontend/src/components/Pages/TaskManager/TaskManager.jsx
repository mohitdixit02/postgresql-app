import React, {useState} from 'react'
import s from "./TaskManager.module.css";
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNotification } from '../../Notifications/Notifications';
import { get_tasks, update_status, create_task } from '../../api/tasks/tasks';


export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const popNotification = useNotification();

    useState(() => {
        get_tasks().then((res) => {
            let data = res.data;
            setTasks(data);
        });
    }, []);

    const onChange = (e) => {
        let checked = e.target.checked;
        let id = e.target.id.split(":")[1];
        let task_no = parseInt(id.split("_")[1]);
        let task_id = tasks[task_no].task_id;
        setTasks(tasks.map((item, index) => {
            if(index === task_no){
                return {...item, task_status: checked ? "done" : "not done"};
            }
            return item;
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
        if(task_name === ""){
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
        }).catch((error) => {
            let response = error.response;
            popNotification('error', response.data, '');
        });

        get_tasks().then((res) => {
            let data = res.data;
            setTasks(data);
        });
        document.querySelector(".new_task_input_section").value = "";
    }

    return (
        <div className={s['task_manager_parent_holder']}>
            <div className={s['task_manager_parent']}>
                <h2>Task Manager</h2>
                <div className={s["task_manager_input_holder"]}>
                    <div>
                        <input type="text" placeholder="Enter Task" className="new_task_input_section" />
                        <button onClick={addNewTask}>Add Task</button>
                    </div>
                </div>
                <hr />
                <div className={s["task_manager_tasks_collection"]}>
                    {tasks.map((item, index) => <div key={`task_card_key:${index}`} className={s["task_manager_task_card"]}>
                        <div className={s["task_manager_task_card_left"]}>
                            <Checkbox checked={item?.task_status === "done" ? true : false} id={`task_manager_card_id:task_${index}`} onChange={onChange}>
                                <div className={s["task_manager_task_card_left_text"]} style={item?.task_status === "done" ? {"textDecoration":"line-through"} : {}}>{item?.task_name}</div>
                            </Checkbox>
                        </div>
                        <div className={s["task_manager_task_card_right"]}>
                            <DeleteOutlined />
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
