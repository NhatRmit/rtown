import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//components
import Newsfeed from './pages/Newsfeed'
import Login from './pages/Login'
import CommentForm from './pages/CommentForm'
import Posts from './components/Posts/Posts'
import EditPost from './components/Posts/EditPost'
const App = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Newsfeed />} />
            <Route path='/login' element={<Login />} />    
            <Route path='/comment' element={<CommentForm />} />          
            <Route path='/posts' element={<Posts />} />   
            <Route path='/edit-posts' element={<EditPost />} />   
          </Routes>
        </Router>
    </>
  );
}

export default App;