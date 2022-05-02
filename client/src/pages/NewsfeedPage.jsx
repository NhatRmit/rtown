import React from "react";
import Layout from "../components/Layout";
// import Filter from '../components/Filter/Filter'
import CommunitySection from "../components/Community/CommunitySection";
import CreatePost from "../components/Post/CreatePost";
import PostsSection from "../components/Post/PostsSection";
import CommentSection from "../components/Comment/CommentSection";
import "./NewsfeedPage.css";

const Newsfeed = () => {
  return (
    <>
      <Layout header footer>
        <div className='newsfeed-container'>
          <div className='left-container'>
            <CommunitySection />
          </div>
          <div className='right-container'>
            <CreatePost />
            <div className='post-types'>
              <span className="post-type"><h1 className="type-title">New</h1></span>
              <span className="post-type"><h1 className="type-title">Trending</h1></span>
              <span className="post-type"><h1 className="type-title">Top</h1></span>
            </div>
            <PostsSection />
            <CommentSection />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Newsfeed;
