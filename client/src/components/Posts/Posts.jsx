// import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { getPosts } from '../../actions/post'
// import { connect, useSelector } from 'react-redux'
// import PostItem from './PostItem'
// import PostForm from './PostForm'

// const Posts = ({ getPosts }) => {
//     const { posts, loading } = useSelector((state) => state.posts)

//     useEffect(() => {
//         getPosts()
//     }, [getPosts])
//     console.log(posts)
//     //console.log(post)
//     return (
//         <div>
//             <div>
//                 <h1 className='large text-primary'>Posts</h1>
//                 <p className='lead'>
//                     <i className='fas fa-user' /> Welcome to the RTown
//                 </p>
//                 <PostForm />
//                 <div className='posts'>
//                     {posts.map(post => (
//                         <PostItem key={post._id} post={post} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// Posts.propTypes = {
//     getPosts: PropTypes.func.isRequired,
//     post: PropTypes.object.isRequired
// }
// const mapStateToProps = state => ({
//     post: state.post
// })
// export default connect(mapStateToProps, { getPosts })(Posts)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="container">
      <Navbar />
      <PostForm />
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      <Footer />
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);