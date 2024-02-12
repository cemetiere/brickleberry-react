import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import useUserStore from '../store/userStore';

function NavigatePanel(props) {
    const {userName, setName} = useUserStore();
    const navigate = useNavigate();
    return (
        <div id='NavigatePanel'>
            <div className='navComponent' onClick={()=>navigate("/people")}><span className='navText'>People</span></div>
            <div className='navComponent' onClick={()=>navigate("/map")}><span className='navText'>Map</span></div>
            <div className='navComponent' onClick={()=>navigate("/animals")}><span className='navText'>Animals</span></div>
            <div className='navComponent' onClick={()=>navigate("/warehouse")}><span className='navText'>Warehouse</span></div>
            <div className='navComponent' onClick={()=>navigate("/login")}><span className='navText'>Log out from {userName}</span></div>
        </div>
    );
}

export default NavigatePanel;