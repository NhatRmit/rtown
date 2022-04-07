import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import style from './LoginNavbar.module.css';

const Navbar = () => {
    return (
        <header className={style["header"]}>
            <div className={style["logo-container"]}>
                <Link to='/'> <img src={logo} alt="RTown logo" className={style["logo"]}/></Link>
                <Link to='/'> RTown </Link>
            </div>
        </header>
    )
}

export default Navbar