import React, { useEffect, useState } from 'react'
import s from "./Home.module.css";
import Cookies from 'js-cookie';
import TaskStatistics from './TaskStatistics/TaskStatistics';
import JobStatistics from './JobStatistics/JobStatistics';
import { get_task_job_analytics } from "../../api/dashboard/dashboard.mjs";
import { useNotification } from "../../Notifications/Notifications";

export default function Home() {
    const user = Cookies.get("user");
    const [analyticsData, setAnalyticsData] = useState(null);
    const popNotification = useNotification();
    useEffect(() => {
        if (user) {
            get_task_job_analytics().then((res) => {
                setAnalyticsData(res.data);
            }).catch((err) => {
                popNotification("error", err.response.data);
            })
        }
    }, []);
    return (
        <div className={s["home_page_holder"]}>
            <div className={s["home_page_top_banner"]}>
                <div className={s["home_page_top_banner_text"]}>
                    <div>
                        Welcome to Day <span>Planner</span>{user ? `, ${user}` : ""}
                    </div>
                    Your personalized day and job management tool
                </div>
            </div>
            {user ?

                <div className={s["home_page_statistics_holder"]}>
                    <TaskStatistics data={analyticsData} />
                    <JobStatistics data={analyticsData} />
                </div>
                :
                <div className={s["home_no_statistics_holder"]}>
                    <div className={s["home_no_statistics_holder_text"]}>
                        Please login to view your statistics
                    </div>
                </div>
            }
        </div>
    )
}
