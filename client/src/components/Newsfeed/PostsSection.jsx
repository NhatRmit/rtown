import './PostsSection.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import {Link} from "react-router-dom"
import PostImage from "./media/rmit-image.png"

const PostsSection = () => {
    return (
       <div className='posts-container'>
           <div className='post-types'>
                <h1 className="title">Popular posts</h1>
                <h1 className="title">Trending posts</h1>
                <h1 className="title">Top posts</h1>
           </div>
           <div className='post-section'>
                <div className='vote-section'>
                    <span className='icon'>
                        {/*CHANGE ICONS FOR ME */}
                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                <BsFillChatDotsFill />
                        </IconContext.Provider>
                    </span>
                    <p className='vote-total'>1000</p>
                    <span className='icon'>
                        {/*CHANGE ICONS FOR ME */}
                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                <BsFillChatDotsFill />
                        </IconContext.Provider>
                    </span>
                </div>

                <div className='content-section'>
                    <div className='content-section-header'>
                        <span className='icon'>
                            {/*CHANGE ICONS FOR ME */}
                            <label htmlFor='username'>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </label>
                            <p id="username" className='username'> Username </p>
                        </span>
                        <p className='uploaded-time'>Posted 1 hour ago</p>
                    </div>
                    <div className='post-content'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin dictum nulla eu hendrerit. Donec commodo fringilla sollicitudin. Duis sit amet ligula quis tellus scelerisque pulvinar ut vitae ligula. Phasellus lectus felis, convallis sit amet consequat quis, interdum eu lectus. Suspendisse potenti. Maecenas at pulvinar lorem. Proin at tellus viverra, lacinia massa nec, rhoncus ligula.</p>
                    </div>
                    <div className='content-section-footer'>
                        <span className='icon'>
                            <Link to="/">
                                <label htmlFor='comment'>
                                    <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                        <BsFillChatDotsFill />
                                    </IconContext.Provider>
                                </label>
                            </Link>
                            <p id="comment"  className='icon-label'> Comments </p>
                        </span>

                        <span className='icon'>
                            <Link to="/">
                                <label htmlFor='report'>
                                    <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                        <BsFillChatDotsFill />
                                    </IconContext.Provider>
                                </label>
                            </Link>
                            <p id="report" className='icon-label'> Report </p>
                        </span>
                    </div>
                </div>
           </div>

           <div className='post-section'>
                <div className='vote-section'>
                    <span className='icon'>
                        {/*CHANGE ICONS FOR ME */}
                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                <BsFillChatDotsFill />
                        </IconContext.Provider>
                    </span>
                    <p className='vote-total'>1000</p>
                    <span className='icon'>
                        {/*CHANGE ICONS FOR ME */}
                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                <BsFillChatDotsFill />
                        </IconContext.Provider>
                    </span>
                </div>

                <div className='content-section'>
                    <div className='content-section-header'>
                        <span className='icon'>
                            {/*CHANGE ICONS FOR ME */}
                            <label htmlFor='username'>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </label>
                            <p id="username" className='username'> Username </p>
                        </span>
                        <p className='uploaded-time'>Posted 1 hour ago</p>
                    </div>
                    <div className='post-content'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin dictum nulla eu hendrerit.</p>
                        <img src={PostImage} alt="Post Image" className='post-image'></img>
                    </div>
                    <div className='content-section-footer'>
                        <span className='icon'>
                            <Link to="/">
                                <label htmlFor='comment'>
                                    <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                        <BsFillChatDotsFill />
                                    </IconContext.Provider>
                                </label>
                            </Link>
                            <p id="comment"  className='icon-label'> Comments </p>
                        </span>

                        <span className='icon'>
                            <Link to="/">
                                <label htmlFor='report'>
                                    <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                        <BsFillChatDotsFill />
                                    </IconContext.Provider>
                                </label>
                            </Link>
                            <p id="report" className='icon-label'> Report </p>
                        </span>
                    </div>
                </div>
           </div>
       </div>
    )
}

export default PostsSection