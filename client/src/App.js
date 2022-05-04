import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//components
import NewsfeedPage from './pages/NewsfeedPage'
import LoginPage from './pages/auth/LoginPage'
import Profile from './components/Profile/Profile'
import UserProfile from './components/Profile/UserProfile'
import PrivateRoute from './PrivateRoute'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import EditPost from './components/Posts/EditPost'
import CommunityRequest from './pages/community/CommunityRequestPage'
import CommunityEditPage from './pages/community/CommunityEditPage'
import CommunityPage from './pages/community/CommunityPage'
import Messenger from './components/Chat/Messenger'
// import EditCommunity from './components/Form/EditCommunity'
import RequestEvent from './components/Form/RequestEvent'
import Image from './components/Image/Image'
import RShopPage from './pages/RShopPage'
import Modal from 'react-modal'
import { getAllProfiles } from './actions/profile'

Modal.setAppElement('#root');


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    } else {
      setAuthToken(localStorage.token)
    }
    dispatch(getAllProfiles())
    dispatch(loadUser())
  }, [dispatch])


  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route
            exact path='/communities/:community_id'
            element={<PrivateRoute element={CommunityPage} />}
          />
          <Route
            exact path='/communities/edit/:community_id'
            element={<PrivateRoute element={CommunityEditPage} />}
          />

          <Route
            exact path='/communities/community-request'
            element={<PrivateRoute element={CommunityRequest} />}
          />
          <Route
            exact path='/chat'
            element={<PrivateRoute element={Messenger} />}
          />
          <Route
            exact path='/communities/event-request/:community_id'
            element={<PrivateRoute element={RequestEvent} />}
          />


          <Route
            exact path='/newsfeed'
            element={<PrivateRoute element={NewsfeedPage} />}
          />

          {/* <Route exact path='/comment' element={<CommentForm />} /> */}
          <Route
            exact path='profiles/:userId'
            element={<PrivateRoute element={UserProfile} />}
          />
          <Route
            exact path='/image'
            element={<PrivateRoute element={Image} />}
          />
          <Route
            exact path='/rshop'
            element={<PrivateRoute element={RShopPage} />}
          />

        </Routes>
      </Router>
    </>
  )
}


export default App;


