import React, { useState, useEffect } from 'react';
import s from "./Navbar.module.css";
import { Button, Spin, Popconfirm } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../Pages/Login/AuthenticationForm';
import Cookies from 'js-cookie';

const activePageTextCollection = {
    "/": "Dashboard",
    "/task_manager": "Task Manager",
    "/job_manager": "Job Manager",
    "/issues": "Issues",
};

export default function Navbar({ collapsed, setCollapsed }) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activePageText, setActivePageText] = useState('');
    const user = Cookies.get('user');
    const navigate = useNavigate();

    const logoutFunction = () => {
        setLoading(true);
        Cookies.remove('user');
        Cookies.remove('token');
        setLoading(false);
        window.location.pathname !== "/" ? navigate('/') : window.location.reload();
    }

    useEffect(() => {
        let path = window.location.pathname;
        setActivePageText(activePageTextCollection?.[path] || "");
    }, [window.location.pathname]);

    return (
        <div className={s["navbar_parent_holder"]}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '14px',
                    width: 40,
                    height: 40,
                }}
            />
            <div className={s["navbar_holder_left"]}>
                {activePageText ? activePageText : "Day Planner"}
            </div>
            <div className={s["navbar_holder_right"]}>
                {user ?
                    <Spin spinning={loading}>
                        <Popconfirm
                            title="Proceed Logout?"
                            description="We will miss you..."
                            onConfirm={logoutFunction}
                            align={"right"}
                            placement="leftTop"
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                color='danger'
                                variant='solid'
                            >
                                Logout
                            </Button>
                        </Popconfirm>
                    </Spin>
                    :
                    <Button
                        color='primary'
                        variant='solid'
                        onClick={() => setVisible(true)}
                    >
                        Login
                    </Button>
                }
            </div>
            <AuthenticationForm visible={visible} setVisible={setVisible} />
        </div>
    )
}
