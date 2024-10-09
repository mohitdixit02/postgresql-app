import React, { useState } from 'react';
import s from "./Navbar.module.css";
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../Pages/Login/AuthenticationForm';
import Cookies from 'js-cookie';

export default function Navbar() {
    const [visible, setVisible] = useState(false);
    const user = Cookies.get('user');
    const navigate = useNavigate();

    const logoutFunction = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        navigate('/');
    }

    return (
        <div className={s["navbar_parent_holder"]}>
            <div className={s["navbar_holder_left"]} onClick={() => navigate('/')}>
                <div>Postgresql-Node</div> App
            </div>
            <div className={s["navbar_holder_right"]}>
                {user ? 
                <Button
                    color='danger'
                    variant='solid'
                    onClick={logoutFunction}
                >
                    Logout
                </Button>
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
