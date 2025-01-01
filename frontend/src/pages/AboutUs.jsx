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
            <p><b>EDITORIAL BOARD | SY 2024-2025</b></p>
            <table>
                <tr>
                    <td><b>EDITOR-IN-CHIEF</b></td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td><b>ASSOCIATE EDITOR</b></td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td><b>MANAGING EDITOR</b></td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td><b>NEWS EDITOR</b></td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td><b>FEATURE EDITOR</b></td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td><b>SCI-TECH EDITOR</b></td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td><b>SPORTS EDITOR</b></td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td><b>EDITORIAL CARTOONIST</b></td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
            </table>
            <p><b>CONTRIBUTORS</b></p>
            <table>
                <tr>
                    <td>JUAN DELA CRUZ</td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td>JUAN DELA CRUZ</td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
                <tr>
                    <td>JUAN DELA CRUZ</td>
                    <td>JUAN DELA CRUZ</td>
                </tr>
            </table>
            <div className='faculty'>
                <h4>EDITHA O. CABANELA</h4>
                <p>ADVISER - ENGLISH</p>
            </div>
            <div className='faculty'>
                <h4>ALJON B. FERNANDEZ</h4>
                <p>CO-ADVISER - SHS</p>
            </div>
            <div className='faculty'>
                <h4>EDDUARDO C. OCAMPO</h4>
                <p>PRINCIPAL III</p>
            </div>
        </div>
        <div className='about-us-development'>
            <div className='about-us-dleft'>
                <img src={logo} alt='logo'></img>
                <p>website</p>
            </div>
            <div className='about-us-middle'></div>
            <div className='about-us-middle'></div>
            <div className='about-us-dright'></div>
        </div>
        <div className='about-us-content'>
            <div className='department-info'>
                <p><b>DEVELOPMENT TEAM</b></p>
                <p><b>CPE 3A | PANGASINAN STATE UNIVERSITY - URDANETA CAMPUS</b></p>
            </div>
            <table className='developers'>
                <tr>
                    <td>ALMUETE, JAMELLA IRA NACES</td>
                    <td>ANTIPOLO, PEARL ORMITA</td>
                </tr>
                <tr>
                    <td>CABANELLA, EDRIENE JAY ORIBELLO</td>
                    <td>DUEÑAS, VICTOR EDWARD RAFANAN</td>
                </tr>
                <tr>
                    <td>ESPARAGUERA, ELYZA BEA DOMINGO</td>
                    <td>GALLARDE, KRISHA CORNELIO</td>
                </tr>
            </table>
            <p className='requirement-txt'>FINAL REQUIREMENT FOR THE COURSE 'CPE 125- WEB DEVELOPMENT'</p>
            <h4><b>ENGR. JEDDIE M. ZARATE</b></h4>
            <div className='department-info'>            
                <p>INSTRUCTOR</p>
                <p>COMPUTER ENGINEERING DEPARTMENT</p>
                <p>PANGASINAN STTATE UNIVERSITY URDANETA CAMPUS</p>
            </div>
            <div className='copyright'>
                <p>TO GOD BE THE GLORY</p>
                <p>COPYRIGHT 2024</p>
            </div>
        </div>
        </>
    );
};

export default AboutUs;