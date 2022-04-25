import React from "react";
import MemberSection from "../../components/Community/MemberSection";
import Layout from "../../components/Layout";
// import Filter from '../components/Filter/Filter'
import CreatePost from "../../components/Newsfeed/CreatePost";
import PostsSection from "../../components/Newsfeed/PostsSection";
import AboutCommunity from "../../components/Community/AboutCommunity";
import "./CommunityPage.css";

const CommunityPage = () => {
  return (
    <>
      <Layout header footer>
        <div className='community-container'>
          <div className='left-container'>
            <MemberSection />
          </div>
          <div className='center-container'>
            <div>
              <CreatePost />
            </div>
            <div>
              <PostsSection />
            </div>
          </div>
          <div className='right-container'>
            <AboutCommunity />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommunityPage;
