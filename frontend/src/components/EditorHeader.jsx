import React from 'react';
import { useState } from 'react';
import './EditorHeader.css';
import logo from '../assets/DIGITAL_light.png'; 

function EditorHeader(){

    const placeholderData = {
    user: 'EDITOR 1',
    };

  return (
    <header className='EditorHeader'>
        <div className='editor-header-left'>
            <img src={logo} alt="Logo" className='logo' />
            <h1>EDITOR PANEL</h1>
        </div>
        <div className='editor-header-right'>
            <h2>{placeholderData.user}</h2>
            <button><i class="fa-solid fa-arrow-right-from-bracket logout-btn"></i></button>
        </div>
    </header>
  );
};

export default EditorHeader;
