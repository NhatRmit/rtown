import React from 'react'
import { useState } from 'react'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { BsFillChatDotsFill, BsSearch } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logo from './logo.png'
import './Navbar.css'
import { logoutUser } from '../../actions/auth'
import { getSearch } from '../../actions/post'

const Navbar = () => {
    const [text, setText] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = (e) => {
        dispatch(logoutUser())
        navigate('/')
    }

    const onProfile = (e) => {
        navigate('/profiles/myProfile')
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getSearch(text ))
        setText('')
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
        // <>
        //     <div className='blank-navbar'></div>
        //     <div className="container-navbar">
        //         <header className='header'>
        //             <div className="logo">
        //                 <img src={logo} alt="" />
        //                 <Link to='/'> RTown </Link>
        //             </div>
        //             <section className="form">
        //                 <form onSubmit={onSubmit}>
        //                     <div className="form-group">
        //                         <input
        //                             type="text"
        //                             name='text'
        //                             id='text'
        //                             placeholder='Search something...'
        //                             value={text}
        //                             onChange={onChange}
        //                         />
        //                         <label>
        //                             <IconContext.Provider value={{ color: '#DDE2E5', size: '2.25rem' }}>
        //                                 <BsSearch />
        //                             </IconContext.Provider>
        //                         </label>
        //                     </div>
        //                 </form>
        //             </section>
        //             <ul>
        //                 <li className='icon-chat' onClick={onProfile}>
        //                     <IconContext.Provider value={{ color: '#DDE2E5', size: '2.25rem' }}>
        //                         <BsFillChatDotsFill />
        //                     </IconContext.Provider>
        //                 </li>
        //                 <li className='icon-user' onClick={onProfile}>
        //                     <IconContext.Provider value={{ color: '#DDE2E5', size: '2.25rem' }}>
        //                         <FaUserCircle />
        //                     </IconContext.Provider>
        //                 </li>
        //                 <li>
        //                     <button className='btn' onClick={onLogout}>
        //                         <IconContext.Provider value={{ size: '0.75rem' }}>
        //                             <FaSignOutAlt /> Logout
        //                         </IconContext.Provider>
        //                     </button>
        //                 </li>
        //             </ul>
        //         </header>
        //     </div>
        //     <div className='blank-navbar'></div>

        // </>

        <header className='header'>
            {/*Logo section*/}
            <div className="logo-container">
                <Link to='/'><img src={logo} alt="RTown logo" className="logo" /></Link>
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