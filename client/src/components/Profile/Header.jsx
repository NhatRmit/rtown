import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    const onMyPosts = e => {
        e.preventDefault()
        navigate('/profiles/myProfile')
    }

    const onRItems = e => {
        e.preventDefault()
    }

    const onRShop = e => {
        e.preventDefault()
        navigate('/profiles/r-shop')
    }
    return (
        <div className='post-types'>
            <h1 onClick={onMyPosts} className="title">My Posts</h1>
            <h1 onClick={onRItems} className="title">R-Items</h1>
            <h1 onClick={onRShop} className="title">R-Shop</h1>
        </div>
    )
}

export default Header