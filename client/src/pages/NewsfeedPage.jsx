
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
// import Filter from '../components/Filter/Filter'
import CommunitySection from '../components/Newsfeed/CommunitySection'
import CreatePost from '../components/Newsfeed/CreatePost'
import PostsSection from '../components/Newsfeed/PostsSection'
import './NewsfeedPage.css'
import { getAllCommunities } from '../actions/community'
import { RiCommunityFill } from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from '../actions/post'
import { loadUser } from '../actions/auth'
import Filter from '../components/Filter/Filter'


const NewsfeedPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const communities = useSelector(state => state.community.communities)
  const posts = useSelector(state => state.post.posts)

  useEffect(() => {
    dispatch(getAllCommunities())
    dispatch(getPosts())
    dispatch(loadUser())
  }, [dispatch])

  const onCreate = e => {
    e.preventDefault()
    navigate('/communities/community-request')
  }
  return (
    <>
      <Layout header footer >
        <div className='newsfeed-container'>
          <div className='newsfeed-left-container'>
            <h1 className="title">Communnity</h1>
            <div onClick={onCreate} className="create-community">
              {/*CHANGE ICON FOR ME*/}
              <span>
                <IconContext.Provider value={{ color: '#C0BFBF', size: '2em' }}>
                  <RiCommunityFill />
                </IconContext.Provider>
              </span>
              <p>Create community</p>
            </div>
            {
              communities && communities.map(community =>
                <CommunitySection key={community._id} community={community} />
              )
            }
          </div>
          <div className='newsfeed-right-container'>
            <>
              <CreatePost />
            </>
            <>
              <Filter />
            </>
            <>
              {
                posts.map(post =>
                  <PostsSection key={post._id} post={post} />
                )
              }
            </>
          </div>
        </div>
      </Layout>
    </>

  )
}
export default NewsfeedPage