import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar-container">
            <header className='header'>
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to='/'> RTown </Link>
                </div>
            </header>
        </div>
    )
}

export default Navbar
