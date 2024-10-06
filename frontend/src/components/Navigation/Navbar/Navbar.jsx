import React, { useState } from 'react';
import s from "./Navbar.module.css";
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../Pages/Login/AuthenticationForm';

export default function Navbar() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    return (
        <div className={s["navbar_parent_holder"]}>
            <div className={s["navbar_holder_left"]} onClick={() => navigate('/')}>
                <div>Postgresql-Node</div> App
            </div>
            <div className={s["navbar_holder_right"]}>
                <Button
                    color='primary'
                    variant='solid'
                    onClick={() => setVisible(true)}
                >
                    Login
                </Button>
            </div>
            <AuthenticationForm visible={visible} setVisible={setVisible} />
        </div>
    )
}
