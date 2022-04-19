import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//components
import NewsfeedPage from './pages/NewsfeedPage'
import LoginPage from './pages/auth/LoginPage'
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
          <Route exact path='/login' element={<LoginPage />} />
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