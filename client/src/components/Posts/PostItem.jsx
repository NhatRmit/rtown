import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link } from "react-router-dom"
import Moment from 'react-moment'
import {connect} from 'react-redux'

const PostItem = ({ auth, post: {_id, text, name, avatar, user, likes, comments, date}}) => {
  return (
    <div>
        <div>
            <p className=''>{text}</p>
            <p className='post-date'> Posted on <Moment format='DD/MM/YYYY'>{date}</Moment></p>
            <button type='button' className='btn btn-light'>
                <i className='fas fa-thumps-up'></i>
                <span>4</span>
            </button>
            <button type='button' className='btn btn-light'>
                <i className='fas fa-thumps-down'></i>
            </button>
            <a href="post.html" className='btn btn-primary'>
                Discussion <span className='comment-count'>2</span>
            </a>
            <button type='button' className='btn btn-danger'>
                <i className='fas fa-times'></i>
            </button>
        </div>
    </div>
  )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {})(PostItem)