import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from "./Sidebar.module.css";
import {
    DashboardOutlined,
    CarryOutOutlined,
    IdcardOutlined,
    WarningOutlined,

} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Dashboard', '/', <DashboardOutlined />),
    getItem('Tasks', '/task_manager', <CarryOutOutlined />),
    getItem('Jobs', '/job_manager', <IdcardOutlined />),
    getItem('Issue', '/issues', <WarningOutlined />),
];

const App = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    return (
        <Sider
            trigger={null}
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className={s["menu_top_display"]}>
                {collapsed ? <div>
                    D<span>P</span>
                </div> : <div>
                    Day <span>Planner</span>
                </div>}
            </div>
            <Menu
                defaultSelectedKeys={[window.location.pathname]}
                mode="inline"
                items={items}
                onClick={(e) => navigate(e.key)}
            />
        </Sider>
    );
};
export default App;