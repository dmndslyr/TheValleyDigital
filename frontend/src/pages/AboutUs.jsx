import React from 'react';
import './AboutUs.css';
import logo from '../assets/DIGITAL_light.png'

function AboutUs(){
    return(
        <>
        <div className='about-us-header'>
            <div className='about-us-left'>
                <img src={logo} alt='logo'></img>
                <p>THE OFFICIAL STUDENT PUBLICATION OF DON AMADEO PEREZ SR. NATIONAL HIGH SCHOOL</p>
            </div>
            <div className='about-us-middle'></div>
            <div className='about-us-middle'></div>
            <div className='about-us-right'>
                <h3>PERSISTENT.</h3>
                <h3>RELEVANT.</h3>
                <h3>INSIGHTFUL.</h3>
            </div>
        </div>
        <div className='about-us-content'>
            <p></p>
        </div>
        </>
    );
};

export default AboutUs;