import React from 'react'
import Post from './PostSection'
import CommentSection from '../Comment/CommentSection'
import './PostSection.css'


const PostSection = () => {
  return (
    <>
     <div className='post-section'>
         <Post/>
         <CommentSection/>
         <Post/>
         <Post/>
         <Post/>
         <Post/>
     </div>
    </>

  )
}

export default PostSection