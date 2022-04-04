import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Posts from './components/Posts/Posts'
import {PrivateRoute} from 'react-private-route'
//components

function App() {
  return (
    <>
        <Router>
          <Routes>
            {/* <Route path='/' element={<Newsfeed />} /> */}
            <Route path='/posts' element={<Posts />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;