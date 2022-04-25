import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//components
import NewsfeedPage from './pages/NewsfeedPage'
import LoginPage from './pages/auth/LoginPage'
import Posts from './components/Posts/Posts'
import CommentForm from './pages/CommentForm'
import Profile from './components/Profile/Profile'
import UserProfile from './components/Profile/UserProfile'
import Community from './components/Communities/Community'
import CreateCommunity from './components/Communities/CreateCommunity'
import PrivateRoute from './PrivateRoute'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import EditPost from './components/Posts/EditPost'
import RItems from './components/Profile/RItems'
import RShop from './components/Profile/RShop'
import CommunityRequest from './pages/community/CommunityRequestPage'
import CommunityEditPage from './pages/community/CommunityEditPage'
import CommunityPage from './pages/community/CommunityPage'

// import EditCommunity from './components/Form/EditCommunity'
import { getPosts } from './actions/post'
import RequestEvent from './components/Form/RequestEvent'

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
            exact path='/communities/event-request'
            element={<PrivateRoute element={RequestEvent} />}
          />

          {/* <Route
            exact path='/communities/community-request'
            element={<PrivateRoute element={RequestForm} />}
          /> */}


          <Route
            exact path='/newsfeed'
            element={<PrivateRoute element={NewsfeedPage} />}
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
            exact path='profiles/:userId'
            element={<PrivateRoute element={UserProfile} />}
          />
          <Route
            exact path='/profiles/r-items'
            element={<PrivateRoute element={RItems} />}
          />
          <Route
            exact path='/profiles/r-shop'
            element={<PrivateRoute element={RShop} />}
          />

        </Routes>
      </Router>
    </>
  )
}
// import {allPages} from "./Pages"

// function App() {
//   const pages = allPages.all;
//   return (
//       <Router>
//         <Routes>
//           {pages.map((page, key) => (
//               <Route key={key} path={page.link} element={page.component} />
//           ))}
//         </Routes>
//       </Router>
//   );
// }

export default App;

// const App = () => {
//   return (
//     <>
//         <Router>
//           <Routes>
//             <Route path='/' element={<Newsfeed />} />
//             <Route path='/login' element={<Login />} />            
//           </Routes>
//         </Router>
//     </>
//   );
// }

// export default App;