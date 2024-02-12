import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import useUserStore from '../store/userStore';




const LoginPage = () => {
    const {userName, userRole, setName, setRole} = useUserStore();
    const navigate = useNavigate();
    function login(){

        if (userName.length!=0){
            console.log(userName.length)
            navigate("/")
        }
    }
    return (
        <div id='LoginPage'>
            <span>Hello, Brickleberry National Park manager! What is your name?</span>
            <input maxLength={7} onChange={(e)=>setName(e.target.value)} type='text' value={userName}/>
            <select onChange={e => setRole(e.target.value)}>
                        <option value={'Управляющий'}>Управляющий</option>
                        <option value={'Инспектор'}>Инспектор</option>
                        <option value={'Научный отдел'}>Научный отдел</option>
                        <option value={'Хозотдел'}>Хозотдел</option>
                </select>
            <button onClick={login}>Log in</button>

        </div>
    );
};

export default LoginPage;