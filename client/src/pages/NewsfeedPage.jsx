import React from "react";
import Layout from "../components/Layout";
// import Filter from '../components/Filter/Filter'
import CommunityList from "../components/Community/CommunityList";
import CreatePost from "../components/Post/CreatePost";
import PostSection from "../components/Post/PostSection";
import Comment from "../components/Comment/Comment";
import "./NewsfeedPage.css";

const Newsfeed = () => {
  return (
    <>
      <Layout header footer>
        <div className='newsfeed-container'>
          <div className='left-container'>
            <CommunityList />
          </div>
          <div className='right-container'>
            <CreatePost />
            <div className='post-types'>
              <span className="post-type"><h1 className="type-title">New</h1></span>
              <span className="post-type"><h1 className="type-title">Trending</h1></span>
              <span className="post-type"><h1 className="type-title">Top</h1></span>
            </div>
            <PostSection />
            {/* <Comment /> */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Newsfeed;
