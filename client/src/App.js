import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//components
import Newsfeed from './pages/Newsfeed'
import Login from './pages/Login'

const App = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Newsfeed />} />
            <Route path='/login' element={<Login />} />            
          </Routes>
        </Router>
    </>
  );
}

export default App;