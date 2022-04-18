import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {allPages} from "./Pages"

function App() {
  const pages = allPages.all;
  return (
      <Router>
        <Routes>
          {pages.map((page, key) => (
              <Route key={key} path={page.link} element={page.component} />
          ))}
        </Routes>
      </Router>
  );
}

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