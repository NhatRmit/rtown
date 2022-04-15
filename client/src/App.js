import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//components
import Newsfeed from './pages/Newsfeed'
import Login from './pages/Login'
import Posts from './components/Posts/Posts'
import CommentForm from './pages/CommentForm'

const App = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Newsfeed />} />
            <Route path='/login' element={<Login />} />    
            <Route path='/posts' element={<Posts />} />                    
            <Route path='/comment' element={<CommentForm />} />          
          </Routes>
        </Router>
    </>
  );
}

export default App;