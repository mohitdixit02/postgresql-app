const { Chart } = await import('chart.js/auto');

const createTaskChart = (taskRef, data) => {
    if (taskRef.current) {
        taskRef.current.destroy();
    }
    const ctx = document.getElementById('task_chart');
    taskRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Completed',
                'Not Completed',
            ],
            datasets: [{
                label: 'Tasks',
                data: [
                    parseInt(data?.["tasks done"]),
                    parseInt(data?.["tasks not done"]),
                ],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                ],
                hoverOffset: 4
            }]
        },
    });
    return () => {
        taskRef.current.destroy();
    };
}

const createJobChart = (jobRef, data) => {
    if (jobRef.current) {
        jobRef.current.destroy();
    }
    const ctx = document.getElementById('job_chart');
    jobRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Preparing',
                'Interview',
                'Rejected',
                'Selected',
        
            ],
            datasets: [{
                label: 'Jobs',
                data: [
                    parseInt(data?.["jobs preparing"]),
                    parseInt(data?.["jobs interview"]),
                    parseInt(data?.["jobs rejected"]),
                    parseInt(data?.["jobs selected"]),
                ],
                backgroundColor: [
                    'rgb(255, 205, 86)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    '#41e06c',
                ],
                hoverOffset: 4
            }]
        },
    });
    return () => {
        jobRef.current.destroy();
    };
}

export {
    createTaskChart,
    createJobChart
}