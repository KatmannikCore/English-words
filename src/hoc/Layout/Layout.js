import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Layout.css'
function Layout (props) {
    return (
        <div className = 'Layout'>
            <Header/>
            <div className = 'block'>
                {props.children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;