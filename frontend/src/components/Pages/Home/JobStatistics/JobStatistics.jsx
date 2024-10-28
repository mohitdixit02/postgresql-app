import React, { useRef, useEffect } from 'react'
import s from "./JobStatistics.module.css";
import { createJobChart } from '../../../charts/charts';

export default function JobStatistics({data}) {
    const jobChartRef = useRef(null);
    useEffect(() => {
        createJobChart(jobChartRef, data);
    }, [data]);
    return (
        <div className={s["job_statistics_main"]}>
            <h2>
                Job Statistics
            </h2>
            <div className={s["job_statistics_container"]}>
                <div className={s["job_statistics_container_layout_1"]}>
                    <div className={s["job_statistics_container_child"]}>
                        <div>
                            <h3>Total Jobs</h3>
                            <div>{data?.["total_jobs"]}</div>
                        </div>
                    </div>
                    <div className={s["job_statistics_container_layout_3"]}>
                        <div className={s["job_statistics_container_child"]}>
                            <div>
                                <h3>Selected</h3>
                                <div>{data?.["jobs selected"]}</div>
                            </div>
                        </div>
                        <div className={s["job_statistics_container_child"]}>
                            <div>
                                <h3>Rejected</h3>
                                <div>{data?.["jobs rejected"]}</div>
                            </div>
                        </div>
                    </div>
                    <div className={s["job_statistics_container_layout_3"]}>
                        <div className={s["job_statistics_container_child"]}>
                            <div>
                                <h3>Preparing</h3>
                                <div>{data?.["jobs preparing"]}</div>
                            </div>
                        </div>
                        <div className={s["job_statistics_container_child"]}>
                            <div>
                                <h3>Interview</h3>
                                <div>{data?.["jobs interview"]}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s["job_statistics_container_layout_2"]}>
                    <div className={s["job_statistics_container_child"]}>
                        <h2>Job Completion</h2>
                        <div>
                            <canvas id="job_chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
