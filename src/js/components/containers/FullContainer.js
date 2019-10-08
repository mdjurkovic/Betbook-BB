import React from 'react';
import Footer from "../menus/Footer";
import Header from "../menus/Header";
import profileHeader from "../menus/profileHeader";

function FullContainer(props) {

    return (<div className='betbook_screen'>
        {props.headerType == 'double' ? <profileHeader {...props.headerProps}/> : <Header {...props.headerProps}/>}
        {props.children}
        <Footer key='footerContainer' {...props.footerProps} />
    </div>);
}

export default FullContainer;