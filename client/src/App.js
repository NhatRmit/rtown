import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//components
import Newsfeed from './pages/Newsfeed'
import Login from './pages/Login'
import Posts from './components/Posts/Posts'
import CommentForm from './pages/CommentForm'
import Profile from './components/Profile/Profile'
import Community from './components/Communities/Community'
import PrivateRoute from './PrivateRoute'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import EditPost from './components/Posts/EditPost'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    } else {
      setAuthToken(localStorage.token)
    }
    dispatch(loadUser())
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route 
            exact path='/newsfeed' 
            element={<PrivateRoute element={Newsfeed} />} 
          />
          <Route 
            exact path='/posts' 
            element={<PrivateRoute element={Posts} />} 
          />
          <Route 
            exact path='posts/:postId'
            element={<PrivateRoute element={EditPost} />} 
          />
          {/* <Route exact path='/comment' element={<CommentForm />} /> */}
          <Route
            exact path='/profiles/myProfile'
            element={<PrivateRoute element={Profile} />}
          />
          <Route
            exact path='/communities/:community_id'
            element={<PrivateRoute element={Community} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;