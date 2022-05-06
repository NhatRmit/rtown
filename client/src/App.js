import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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
import Modal from 'react-modal'
import { getAllProfiles } from './actions/profile'

Modal.setAppElement('#root');


const App = () => {
  const dispatch = useDispatch()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    } else {
      setAuthToken(localStorage.token)
    }
    dispatch(getAllProfiles())
    dispatch(loadUser())
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

        </Routes>
      </Router>
    </>
  )
}


export default App;


