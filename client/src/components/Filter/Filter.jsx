import React from 'react'
import { TiStarburstOutline } from 'react-icons/ti'
import { HiTrendingUp } from 'react-icons/hi'
import { IoIosPodium } from 'react-icons/io'
import { IconContext } from 'react-icons/lib'
import { getPosts, getFilter } from '../../actions/post'

import './Filter.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Filter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onClickTop = (e) => {
    e.preventDefault()
    navigate(`/newsfeed/filter?top`)
    dispatch(getFilter('top'))
  }

  const onClickTrending = (e) => {
    e.preventDefault()
    dispatch(getFilter('trending'))
  }

  const onClickNewest = (e) => {
    e.preventDefault()
    dispatch(getPosts())
  }

  return (
    <div className="container-filter">
      <header className='header-filter'>
        <ul>
          <li>
            <button className='btn-filter' onClick={onClickNewest}>
              <IconContext.Provider value={{ size: '0.75rem' }}>
                <TiStarburstOutline /> New
              </IconContext.Provider>
            </button>
          </li>
          <li>
            <button className='btn-filter' onClick={onClickTrending}>
              <IconContext.Provider value={{ size: '0.75rem' }}>
                <HiTrendingUp /> Treding
              </IconContext.Provider>
            </button>
          </li>
          <li>
            <button className='btn-filter' onClick={onClickTop}>
              <IconContext.Provider value={{ size: '0.75rem' }}>
                <IoIosPodium /> Top
              </IconContext.Provider>
            </button>
          </li>
        </ul>
      </header>
    </div>
  )
}

export default Filter