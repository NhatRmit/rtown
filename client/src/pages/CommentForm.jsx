import React from 'react'
import CommentForm from '../post/CommentForm'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Layout from '../components/Layout'
import './Newsfeed.css'

const CommentFormed = () => {
  return (
    <>
      <Layout header footer>
      <section>
        <div className='blank-newsfeed'></div>

        <div className='side-container-newsfeed'>
          <Sidebar />
        </div>
        <div className='main-container-newsfeed'>
          <CommentForm />
        </div>
        
        <div className='blank-newsfeed'></div>
      </section>
      </Layout>
    </>
  )
}

export default CommentFormed