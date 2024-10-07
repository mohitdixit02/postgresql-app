import React from 'react'
import s from "./TaskManager.module.css";
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


export default function TaskManager() {
    const onChange = (e) => {
        let checked = e.target.checked;
        // console.log(e.target);
        // if(checked){
        //     document.getElementsByClassName(s["task_manager_task_card_left_text"])[0].style.textDecoration = "line-through";
        // }
        // else{
        //     document.getElementsByClassName(s["task_manager_task_card_left_text"])[0].style.textDecoration = "none";
        // }
    };

    return (
        <div className={s['task_manager_parent_holder']}>
            <div className={s['task_manager_parent']}>
                <h2>Task Manager</h2>
                <div className={s["task_manager_input_holder"]}>
                    <div>
                        <input type="text" placeholder="Enter Task" />
                        <button>Add Task</button>
                    </div>
                </div>
                <hr />
                <div className={s["task_manager_tasks_collection"]}>
                    {[0, 0, 0, 0].map((item, index) => <div className={s["task_manager_task_card"]}>
                        <div className={s["task_manager_task_card_left"]}>
                            <Checkbox id={`task_manager_card_id:task_${index}`} onChange={onChange}>
                                <div className={s["task_manager_task_card_left_text"]}>Task {index + 1}</div>
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
