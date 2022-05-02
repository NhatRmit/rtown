import React from "react";
import Layout from "../../components/Layout";
import MemberList from "../../components/Community/MemberList";

// import Filter from '../components/Filter/Filter'
import CreatePost from "../../components/Post/CreatePost";
import PostsSection from "../../components/Post/PostsSection";
import AboutCommunity from "../../components/Community/AboutCommunity";
import "./CommunityPage.css";

const CommunityPage = () => {
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
              <PostsSection />
            </div>
          </div>
          <div className='right-community-container'>
            <AboutCommunity />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommunityPage;
