import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import useUserStore from '../store/userStore';




const LoginPage = () => {
    const {userName, setName} = useUserStore();
    const navigate = useNavigate();
    function login(){

        if (userName.length!=0){
            console.log(userName.length)
            navigate("/main")
        }
    }
    return (
        <div id='LoginPage'>
            <span>Hello, Brickleberry National Park manager! What is your name?</span>
            <input maxLength={7} onChange={(e)=>setName(e.target.value)} type='text' value={userName}/>
            <button onClick={login}>Log in</button>
        </div>
    );
};

export default LoginPage;