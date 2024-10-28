import React, { useState } from 'react'
import Navbar from '../Navigation/Navbar/Navbar';
import { Layout } from 'antd';
import SideBar from '../Navigation/SideBar/SideBar';
import Footer from '../Navigation/Footer/Footer';
import s from "./NavFootWrapper.module.css";

export default function NavFootWrapper({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={s["nav_foot_wrapper_main"]}>
            <div className={s["nav_foot_wrapper_child"]}>
                <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout
                    position='relative'
                >
                    <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
                    {children}
                </Layout>
                <Footer />
            </div>
        </div>
    )
}
