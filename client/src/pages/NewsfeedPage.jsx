import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import CommunitySection from '../components/Community/CommunitySection'
import CreatePost from '../components/Post/CreatePost'
import PostsSection from '../components/Post/PostsSection'
import './NewsfeedPage.css'
import { getAllCommunities } from '../actions/community'
import { getProfile } from '../actions/profile'
import { RiCommunityFill } from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'
import { useNavigate } from "react-router-dom";
import { getPosts } from '../actions/post'
import Filter from '../components/Filter/Filter'


const NewsfeedPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const communities = useSelector(state => state.community.communities)
  const posts = useSelector(state => state.post.posts)

  useEffect(() => {
    dispatch(getAllCommunities())
    dispatch(getPosts())
    dispatch(getProfile())
  }, [dispatch])

  const onCreate = e => {
    e.preventDefault()
    navigate('/communities/community-request')
  }
  return (
    <>
      <Layout header footer>
        <div className='newsfeed-container'>
          <div className='newsfeed-left-container'>
            <h1 className='title'>Community</h1>
            <div onClick={onCreate} className='create-community-section'>
              <span className='create-icon'>
                <IconContext.Provider value={{ color: '#C0BFBF', size: "2em" }}>
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
              <CreatePost isCommunity={false} />
            </>
            <>
              <Filter />
            </>
            <>
              {
                posts.map(post =>
                  post.Rpoint === 0 ?
                    <PostsSection key={post._id} post={post} isEvent={false} />
                    :
                    <PostsSection key={post._id} post={post} isEvent={true} />
                )
              }
            </>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default NewsfeedPage
