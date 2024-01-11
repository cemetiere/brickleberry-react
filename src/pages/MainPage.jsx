import React from 'react';
import useUserStore from '../store/userStore';
import { Navigate, Link } from 'react-router-dom';
import NavigatePanel from '../components/navigatePanel';
import Footer from '../components/footer';


function MainPage(props) {
    const {userName, setName} = useUserStore();
    return userName.length!=0 ?(
        <div>
            <NavigatePanel/>
            <div className='main'></div>
            <Footer/>
        </div>
    ):(
        <Navigate to="/login"/>
    );
}

export default MainPage;