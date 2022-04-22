import React from 'react'
import { TiStarburstOutline } from 'react-icons/ti'
import { HiTrendingUp } from 'react-icons/hi'
import { IoIosPodium } from 'react-icons/io'
import { IconContext } from 'react-icons/lib'
import { AiFillShop } from 'react-icons/ai'
import { getPosts, getFilter, getMyPosts } from '../../actions/post'

import './Filter.css'
import { useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'

const Filter = () => {
  const dispatch = useDispatch()
  const profile = useMatch('/profiles/myProfile')
  const userprofile = useMatch('/profiles/:userId')
  const navigate = useNavigate()

  const onClickTop = (e) => {
    e.preventDefault()
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

  const onMyPosts = (e) => {
    e.preventDefault()
    dispatch(getMyPosts())
  }

  const onRItems = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const onRShop = (e) => {
    e.preventDefault()
  }


  return (
    <div className="container-filter">
      <header className='header-filter'>
        {
          profile || userprofile ? (
            <ul>
              <li>
                <button className='btn-filter' onClick={onMyPosts}>
                  <IconContext.Provider value={{ size: '0.75rem' }}>
                    <TiStarburstOutline /> My Posts
                  </IconContext.Provider>
                </button>
              </li>
              <li>
                <button className='btn-filter' onClick={onRItems}>
                  <IconContext.Provider value={{ size: '0.75rem' }}>
                    <AiFillShop /> R-Items
                  </IconContext.Provider>
                </button>
              </li>
              <li>
                <button className='btn-filter' onClick={onRShop}>
                  <IconContext.Provider value={{ size: '0.75rem' }}>
                    <AiFillShop /> R-Shop
                  </IconContext.Provider>
                </button>
              </li>
            </ul >
          ) : (
            <ul>
              <li>
                <button className='btn-filter' onClick={onClickNewest}>
                  <IconContext.Provider value={{ size: '0.75rem' }}>
                    <TiStarburstOutline /> New
                  </IconContext.Provider>
                </button>
              </li >
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
            </ul >
          )
        }

      </header >
    </div >
  )
}

export default Filter