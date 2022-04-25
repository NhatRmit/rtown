import './PostsSection.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { BiUpvote, BiDownvote, BiUserCircle } from 'react-icons/bi'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { IconContext } from 'react-icons/lib'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import { useEffect, useState } from 'react'
import { deletePost, clearPost, getPostById, addUpvote, addDownvote, removeUpvote, } from '../../actions/post'
import EditPost from '../Posts/EditPost'
import CommentItem from '../../post/CommentItem'
import CommentForm from '../../post/CommentForm'


const PostsSection = ({ post }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const profiles = useSelector(state => state.profile.profiles)
    const [edit, setEdit] = useState(false)

    const onEdit = e => {
        e.preventDefault()
        setEdit(true)
        // navigate(`/posts/${post._id}`)
        dispatch(getPostById(post._id))
        dispatch(clearPost())
    }
    const onDelete = (e) => {
        e.preventDefault()
        dispatch(deletePost(post._id))
    }
    const onProfile = (e) => {
    }
    const onUpvote = (e) => {
        e.preventDefault()
        e.target.style.color='blue'
        dispatch(addUpvote(post._id))
    }
    const unUpvote = (e) => {
        e.preventDefault()
        e.target.style.color='red'
        dispatch(removeUpvote(post._id))
    }

    const handleUpvote = (e) => {
        e.preventDefault()
        post.upvotes.length === 0 ?  onUpvote(e)  :  unUpvote(e)
    }
    const handleDownvote = (e) => {
        e.preventDefault()
        post.upvotes.length === 1 ?  unUpvote(e)  :  unUpvote(e)
    }



    return (
        <div className='posts-container'>
            <div className='post-section'>
                <div className='vote-section'>
                    <span className='icon' onClick={ handleUpvote } >
                        {/*CHANGE ICONS FOR ME */}
                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                            <BiUpvote />
                        </IconContext.Provider>

                    </span>
                    <p className='vote-total'>{post.upvotes.length}</p>
                    <span className='icon' onClick={ handleDownvote }>
                        <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                            <BiDownvote />
                        </IconContext.Provider>
                    </span>

                </div>

                <div className='content-section'>
                    <div className='content-section-header'>
                        <span onClick={onProfile} className='icon'>
                            <label htmlFor='username'>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BiUserCircle />
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
                                    <EditPost singlePost={post} />
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
                            <span onClick={onEdit} className='icon'>
                                <label htmlFor='report'>
                                    <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                        <AiFillEdit />
                                    </IconContext.Provider>
                                </label>
                                <p id="report" className='icon-label'> Edit
                                </p>
                            </span>
                        }
                        {
                            auth._id === post.user &&
                            <span onClick={onDelete} className='icon'>
                                <label htmlFor='report'>
                                    <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                        <AiFillDelete />
                                    </IconContext.Provider>
                                </label>
                                <p id="report" className='icon-label'> Delete
                                </p>
                            </span>
                        }

                    </div>
                </div>
            </div>
            <div>
                <CommentForm postId={post._id}/>
                <CommentItem post={post} />
            </div>
        </div>
    )
}

export default PostsSection