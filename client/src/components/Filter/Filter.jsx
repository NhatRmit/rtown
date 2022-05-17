import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts, getFilter } from '../../actions/post'

import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()

  const onClickTop = (e) => {
    e.preventDefault()
    toggleTab(3)
    dispatch(getFilter('top'))
  }

  const onClickTrending = (e) => {
    e.preventDefault()
    toggleTab(2)
    dispatch(getFilter('trending'))
  }

  const onClickNewest = (e) => {
    e.preventDefault()
    toggleTab(1)
    dispatch(getPosts())
  }

  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index) => {
    setToggleState(index)
  }

  return (
    <div className='newsfeed-section'>
      <div className='newsfeed-wrapper'>
        <div className='newsfeed-tabs-container'>
          <div className='newsfeed-bloc-tabs'>
            <button
              className={toggleState === 1 ? "newsfeed-tabs newsfeed-active-tabs" : "tabs"}
              onClick={onClickNewest}>
              New
            </button>
            <button
              className={toggleState === 2 ? "newsfeed-tabs newsfeed-active-tabs" : "newsfeed-tabs"}
              onClick={onClickTrending}>
              Trending
            </button>
            <button
              className={toggleState === 3 ? "newsfeed-tabs newsfeed-active-tabs" : "newsfeed-tabs"}
              onClick={onClickTop}>
              Top
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Filter