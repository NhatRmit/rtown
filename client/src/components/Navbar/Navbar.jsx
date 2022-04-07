import React from 'react'
import { useState } from 'react'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { BsFillChatDotsFill, BsSearch } from 'react-icons/bs'

import { IconContext } from 'react-icons/lib'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logo from './logo.png'
import './Navbar.css'

const Navbar = () => {
    const [text, setText] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = (e) => {
        dispatch()
        navigate('/login')
    }

    const onProfile = (e) => {
        navigate('/profile')
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
        <>
            <div className='blank-navbar'></div>
            <div className="container-navbar">
                <header className='header'>
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to='/'> RTown </Link>
                    </div>
                    <section className="form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name='text'
                                    id='text'
                                    placeholder='Search something...'
                                    value={text}
                                    onChange={onChange}
                                />
                                <label>
                                    <IconContext.Provider value={{ color: '#DDE2E5', size: '2.25rem' }}>
                                        <BsSearch />
                                    </IconContext.Provider>
                                </label>
                            </div>
                        </form>
                    </section>
                    <ul>
                        <li className='icon-chat' onClick={onProfile}>
                            <IconContext.Provider value={{ color: '#DDE2E5', size: '2.25rem' }}>
                                <BsFillChatDotsFill />
                            </IconContext.Provider>
                        </li>
                        <li className='icon-user' onClick={onProfile}>
                            <IconContext.Provider value={{ color: '#DDE2E5', size: '2.25rem' }}>
                                <FaUserCircle />
                            </IconContext.Provider>
                        </li>
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <IconContext.Provider value={{ size: '0.75rem' }}>
                                    <FaSignOutAlt /> Logout
                                </IconContext.Provider>
                            </button>
                        </li>
                    </ul>
                </header>
            </div>
            <div className='blank-navbar'></div>

        </>

    )
}

export default Navbar
