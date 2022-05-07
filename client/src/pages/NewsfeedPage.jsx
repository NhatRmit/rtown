import React from "react";
import Layout from "../components/Layout";
// import Filter from '../components/Filter/Filter'
import CommunitySection from "../components/Community/CommunitySection";
import CreatePost from "../components/Post/CreatePost";
import Newsfeed from "../components/Newsfeed/Newsfeed";
import "./NewsfeedPage.css";

const NewsfeedPage = () => {
  return (
    <>
      <Layout header footer>
        <div className='newsfeed-container'>
          <div className='left-container'>
            <CommunitySection />
          </div>
          <div className='right-container'>
            <CreatePost />
            <Newsfeed />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewsfeedPage;
