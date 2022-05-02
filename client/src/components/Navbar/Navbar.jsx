import React from 'react'
import { useState } from 'react'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { BsFillChatDotsFill, BsSearch, BsShopWindow } from 'react-icons/bs'
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

    const onShop = (e) => {
        navigate('/rshop')
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
        <header className='header'>
            {/*Logo section*/}
            <div className="logo-container">
                <Link to='/'><img src={logo} alt="RTown logo" className="logo"/></Link>
                <Link to='/'> RTown </Link>
            </div>

            {/*Search bar*/}
            <section className="search-bar-section">
                <form onSubmit={onSubmit}>
                    <div className="search-bar">
                        <input
                            type="text"
                            name='text'
                            id='text'
                            placeholder='Search something...'
                            value={text}
                            onChange={onChange}
                        />
                        <label>
                            <IconContext.Provider value={{ className: "search-icon", color: 'white', size: '1.6em' }}>
                                    <BsSearch />
                            </IconContext.Provider>
                        </label>
                    </div>
                </form>
            </section>

            <div className='right-section'>
            <span className='icon-shop' onClick={onShop}>
                    <IconContext.Provider value={{ color: '#FFFFFF', size: '2em' }}>
                        <BsShopWindow />
                    </IconContext.Provider>
                </span>

                <span className='icon-chat' onClick={onProfile}>
                    <IconContext.Provider value={{ color: '#FFFFFF', size: '2em' }}>
                        <BsFillChatDotsFill />
                    </IconContext.Provider>
                </span>

                <span className='icon-user' onClick={onProfile}>
                    <IconContext.Provider value={{ color: '#FFFFFF', size: '2em' }}>
                        <FaUserCircle />
                    </IconContext.Provider>
                </span>

                <span>
                    <button className='logout-btn' onClick={onLogout}>
                        <IconContext.Provider value={{ size: '0.75rem' }}>
                            <FaSignOutAlt /> Logout
                        </IconContext.Provider>
                    </button>
                </span>    

            </div>
        </header>
    )
}

export default Navbar