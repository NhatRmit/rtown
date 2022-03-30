import React, {useEffect} from 'react'
import {BrowseRouter as Router, Routes, Route} from 'react-router-dom'

//redux
import {Provider} from 'react-redux'
import store from './app/store'


function App() {
  return (
    <Provider store={store}>
      <Router>
        
        <Routes>
          <Route />

        </Routes>
      </Router>
    </Provider> 
  );
}

export default App;