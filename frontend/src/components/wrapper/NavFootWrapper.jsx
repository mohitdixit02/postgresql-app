import React from 'react'
import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '../Navigation/Footer/Footer';

export default function NavFootWrapper({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
