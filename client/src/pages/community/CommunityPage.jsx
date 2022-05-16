import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommunityById } from '../../actions/community'
import Layout from "../../components/Layout";
import MemberSection from "../../components/Community/MemberSection";

import CreatePost from "../../components/Post/CreatePost";
import PostsSection from "../../components/Post/PostsSection";
import AboutCommunity from "../../components/Community/AboutCommunity";
import "./CommunityPage.css";
import { getCommunityPosts } from '../../actions/post'

const CommunityPage = () => {
  const dispatch = useDispatch()
  const { community_id } = useParams()

  useEffect(() => {
    dispatch(getCommunityById(community_id))
    dispatch(getCommunityPosts(community_id))
  }, [dispatch, community_id])

  const posts = useSelector(state => state.post.posts)
  const community = useSelector(state => state.community.community)
  const auth = useSelector(state => state.auth._id)

  const memberIndex = community && community.members
    .map(member => member.memberId)
    .indexOf(auth)

  return (
    <>
      <Layout header footer>
        <div className='community-container'>
          <div className='left-community-container'>
            <div className='member-container'>
              <h1 className='title'>Members</h1>
              <div className="member-list">
                {community && community.members && community.members.map((member) => (
                  <MemberSection key={member._id} community={community} member={member} />
                ))}
              </div>
            </div>
          </div>
          <div className='center-community-container'>
            <div>
              {
                memberIndex !== -1 ? <CreatePost isCommunity={true} /> : <></>
              }
            </div>
            <div>
              {posts.map(post => <PostsSection key={post._id} post={post} />
              )}
            </div>

            <span ></span>
          </div>
          <div className='right-community-container'>
            <AboutCommunity community_id={community_id} community={community} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommunityPage;
