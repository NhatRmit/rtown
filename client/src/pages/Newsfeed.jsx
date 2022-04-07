import React from 'react'
import Filter from '../components/Filter/Filter'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Layout from '../components/Layout'
import './Newsfeed.css'

const Newsfeed = () => {
  return (
    <>
      <Layout header footer>
      <section>
        <div className='blank-newsfeed'></div>

        <div className='side-container-newsfeed'>
          <Sidebar />
        </div>
        <div className='main-container-newsfeed'>
          <Filter />
        </div>
        
        <div className='blank-newsfeed'></div>
      </section>
      </Layout>
    </>
  )
}

export default Newsfeed