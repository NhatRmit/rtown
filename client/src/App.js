import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NewsfeedPage from './pages/NewsfeedPage'
import LoginPage from './pages/auth/LoginPage'
import UserProfile from './components/Profile/UserProfile'
import PrivateRoute from './PrivateRoute'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import CommunityRequest from './pages/community/CommunityRequestPage'
import CommunityEditPage from './pages/community/CommunityEditPage'
import CommunityPage from './pages/community/CommunityPage'
import Messenger from './components/Chat/Messenger'
import RequestEvent from './components/Form/RequestEvent'
import RShopPage from './pages/RShopPage'
import AdminProfilePage from './pages/profile/AdminProfilePage'
import Modal from 'react-modal'
import { getAllProfiles, getProfile } from './actions/profile'
import { getItemByProfile } from './actions/item'

Modal.setAppElement('#root');

const App = () => {
  const dispatch = useDispatch()
  const admin = useSelector(state => state.auth.admin)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    } else {
      setAuthToken(localStorage.token)
    }
    dispatch(getAllProfiles())
    dispatch(loadUser())
    // dispatch(getProfile())
    setInterval(
      () => {
        setTime(new Date())
      }, 1000)
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
            exact path='/rshop'
            element={<PrivateRoute element={RShopPage} />}
          />

          {
            admin ? <Route
            exact path='/admin-profile'
            element={<PrivateRoute element={AdminProfilePage} />}
          /> : <Route
          exact path='/newsfeed'
          element={<PrivateRoute element={NewsfeedPage} />}
        />
            
          }
          {/* <Route
            exact path='/admin-profile'
            element={<PrivateRoute element={AdminProfilePage} />}
          /> */}


        </Routes>
      </Router>
    </>
  )
}


export default App;


