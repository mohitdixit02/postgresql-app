import React, { useEffect, useRef } from 'react'
import s from "./TaskStatistics.module.css";
import { createTaskChart } from "../../../charts/charts";

export default function TaskStatistics({data}) {
    const taskChartRef = useRef(null);

    useEffect(() => {
        createTaskChart(taskChartRef, data);
    }, [data]);

    return (
        <div className={s["task_statistics_main"]}>
            <h2>
                Task Statistics
            </h2>
            <div className={s["task_statistics_container"]}>
                <div className={s["task_statistics_container_layout_1"]}>
                    <div className={s["task_statistics_container_child"]}>
                        <div>
                            <h3>Total Tasks</h3>
                            <div>{data?.["total_tasks"]}</div>
                        </div>
                    </div>
                    <div className={s["task_statistics_container_layout_3"]}>
                        <div className={s["task_statistics_container_child"]}>
                            <div>
                                <h3>Tasks Completed</h3>
                                <div>{data?.["tasks done"]}</div>
                            </div>
                        </div>
                        <div className={s["task_statistics_container_child"]}>
                            <div>
                                <h3>Tasks Left</h3>
                                <div>{data?.["tasks not done"]}</div>
                            </div>
                        </div>
                    </div>
                    <div className={s["task_statistics_container_layout_3"]}>
                        <div className={s["task_statistics_container_child"]}>
                            <div>
                                <h3>Tasks Completion</h3>
                                <div>{data?.["percentage_tasks_completed"]}%</div>
                            </div>
                        </div>
                        <div className={s["task_statistics_container_child"]}>
                            <div>
                                <h3>Hours Left</h3>
                                <div>{data?.["hours_left"]}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s["task_statistics_container_layout_2"]}>
                    <div className={s["task_statistics_container_child"]}>
                        <h2>Day Completion</h2>
                        <div>
                            <canvas id="task_chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
