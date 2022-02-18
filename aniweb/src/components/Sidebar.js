import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import animeService from '../animeService';


const Sidebar = ({ user, logout, helper }) => {

    const [data, setData] = useState(null);
    

    const changeSidebar = () => {
        document.getElementsByClassName('sidebar')[0].style.left = "-225px";
        
    }

    useEffect(() => {
        const fetchUser = async () => {
            
            const d = await animeService.getUserId(user.user_id)

            setData(d)
        }
        fetchUser()

    }, [helper])

    return (
        <div className="sidebar">
            <button onClick={changeSidebar} className="gg-close"></button>
            <div className='profile-div'><img className='profile' src={data ? data.profile : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'} alt=''></img></div>
            <p className='profile-text'>{user.username}</p>

            <ul>
                {user.username == '' ? '' : <li className='open-profile'><Link to='/settings'> Profile </Link></li>}
                {user.username == '' ? <li className='login-class' ><button className='login' onClick={() => {
                    document.getElementsByClassName('container-form')[0].style.display = 'block'
                    document.getElementsByClassName('container-form-user')[0].style.display = 'none'
                }}> Login </button></li> : <li ><button className='logout' onClick={logout}>Logout</button></li>}
                {user.username == '' ? <li ><button onClick={() => {
                    document.querySelector('.container-form-user').style.display = 'block'
                    document.getElementsByClassName('container-form')[0].style.display = 'none'
                }} className='signup' > Sign up </button> </li> : ''}
            </ul>

        </div>
    )
}

export default Sidebar;

