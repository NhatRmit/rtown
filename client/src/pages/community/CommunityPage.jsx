import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getCommunityById } from '../../actions/community'
import EditCommunity from '../../components/Form/EditCommunity'
import MemberSection from "../../components/Community/MemberSection";
import Layout from "../../components/Layout";
import MemberList from "../../components/Community/MemberList";

// import Filter from '../components/Filter/Filter'
import CreatePost from "../../components/Post/CreatePost";
import PostsSection from "../../components/Post/PostsSection";
import AboutCommunity from "../../components/Community/AboutCommunity";
import "./CommunityPage.css";
import { getPosts } from '../../actions/post'

const CommunityPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { community_id } = useParams()

  useEffect(() => {
    dispatch(getCommunityById(community_id))
    dispatch(getPosts())
  }, [dispatch, community_id])

  const posts = useSelector(state => state.post.posts)
  const community = useSelector(state => state.community.community)

  return (
    <>
      <Layout header footer>
        <div className='community-container'>
          <div className='left-community-container'>
            <MemberList />
          </div>
          <div className='center-community-container'>
            <div>
              <CreatePost />
            </div>
            <div>
              {posts.map(post => <PostsSection key={post._id} post={post} />
              )}
            </div>
          </div>
          <div className='right-container'>
            <AboutCommunity key={community_id} community_id={community_id} community={community} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommunityPage;
