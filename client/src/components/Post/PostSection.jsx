import React from 'react'
import Post from './Post'
import './PostSection.css'


const PostSection = () => {
  return (
    <>
     <div className='post-section'>
         <Post/>
         <Post/>
         <Post/>
         <Post/>
         <Post/>
     </div>
    </>

  )
}

export default PostSection