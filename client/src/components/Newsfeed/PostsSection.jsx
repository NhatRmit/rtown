import './PostsSection.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'
import { IconContext } from 'react-icons/lib'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import { useEffect, useState } from 'react'
import { clearPost, getPostById } from '../../actions/post'
import EditPost from '../Posts/EditPost'

const PostsSection = ({ post }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [edit, setEdit] = useState(false)
    const onEdit = e => {
        e.preventDefault()
        setEdit(true)
        // navigate(`/posts/${post._id}`)
        dispatch(getPostById(post._id))
        dispatch(clearPost())
    }

    return (
        <div className='posts-container'>
            <div className='post-section'>
                <div className='vote-section'>
                    <span className='icon'>
                        {/*CHANGE ICONS FOR ME */}
                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                            <BiUpvote />
                        </IconContext.Provider>
                    </span>
                    <p className='vote-total'>{post.upvotes.length}</p>
                    <span className='icon'>
                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                            <BiDownvote />
                        </IconContext.Provider>
                    </span>
                </div>

                <div className='content-section'>
                    <div className='content-section-header'>
                        <span className='icon'>
                            <label htmlFor='username'>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </label>
                            <p id="username" className='username'>{post.name}</p>
                        </span>
                        <p className='uploaded-time'>
                            <Moment format='DD/MM/YYYY'>
                                {post.date}
                            </Moment></p>
                    </div>
                    <div className='post-content'>
                        <div>
                            {
                                !edit ? post.text : 
                                <EditPost singlePost={post}/>
                            }
                        </div>
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
                            <p id="comment" className='icon-label'> Comments </p>
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
                        {
                            auth._id === post.user &&
                            <span className='icon'>
                                <Link to="/">
                                    <label htmlFor='report'>
                                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                            <BsFillChatDotsFill />
                                        </IconContext.Provider>
                                    </label>
                                </Link>
                                <p id="report" className='icon-label'> Delete
                                </p>
                            </span>
                        }
                        {
                            auth._id === post.user &&
                            <span onClick={onEdit} className='icon'>
                                <label htmlFor='report'>
                                    <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                        <BsFillChatDotsFill />
                                    </IconContext.Provider>
                                </label>
                                <p id="report" className='icon-label'> Edit
                                </p>
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostsSection