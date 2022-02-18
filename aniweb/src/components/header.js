import React from 'react';
import { Link } from "react-router-dom";

const openSidebar = () => {
    document.getElementsByClassName('sidebar')[0].style.left = "0px";
}

const Header = ({ }) => {
    return (
        <div className="header-main">
            <button onClick={openSidebar} className='open-sidebar' ><i className="gg-menu-boxed"></i>  </button>
            <ul className='ul-header'>
                <li className='main'><Link to="/"> Main </Link></li>
                <li className='animelist'><Link to="/animelist"> Anime </Link></li>
                <li className='news'><Link to="/news"> News </Link></li>
                <li className='about'><Link to="/about"> About </Link></li>

            </ul>


        </div>
    )
}

export default Header;