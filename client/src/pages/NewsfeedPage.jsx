import React from 'react'
import Layout from '../components/Layout'
// import Filter from '../components/Filter/Filter'
import CommunitySection from '../components/Newsfeed/CommunitySection'
import CreatePost from '../components/Newsfeed/CreatePost'
import PostsSection from '../components/Newsfeed/PostsSection'
import './NewsfeedPage.css'


const Newsfeed = () => {
  return (
    <>
      <Layout header footer >
        <div className='newsfeed-container'>
        <div className='left-container'> 
          <CommunitySection />
        </div>
        <div className='right-container'>
          <div>
            <CreatePost />
          </div>
          <div>
            <PostsSection />
          </div>
        </div>
        </div>
       
      </Layout>
  
     
  


    </>

  )
}

export default Newsfeed