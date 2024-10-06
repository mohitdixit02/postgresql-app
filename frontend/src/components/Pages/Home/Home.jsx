import React from 'react'
import s from "./Home.module.css";
import { EditOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className={s["home_page_holder"]}>
            <div className={s["home_page_top_banner"]}>
                <div className={s["home_page_top_banner_text"]}>
                    <div>
                        Welcome to Postgresql-Node App
                    </div>
                    Select your desired option from below
                </div>

            </div>

            <div className={s["home_page_options_holder"]}>
                <div className={s["home_page_option_card"] + " "+  s["left_card_home"]} onClick={()=> navigate('/task_manager')}>
                    <div>
                        <EditOutlined />
                    </div>
                    <div>
                        Task Manager
                    </div>
                </div>
                <div className={s["home_page_option_card"]+ " " + s["right_card_home"]} onClick={()=> navigate('/job_manager')}>
                    <div>
                        <CreditCardOutlined />
                    </div>
                    <div>
                        Job Manager
                    </div>
                </div>
            </div>
        </div>
    )
}
