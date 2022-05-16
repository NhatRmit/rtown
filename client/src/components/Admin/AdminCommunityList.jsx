import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommunityRequest, adminAcceptCommunityRequest, adminDeletePost } from "../../actions/admin"
import { kickMember } from "../../actions/community";
import { getCommunityPosts, getPosts } from "../../actions/post";



const AdminCommunityList = ({ community }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector(state => state.post.posts)

    useEffect(() => {
        dispatch(getCommunityPosts(community._id))
    }, [dispatch, community._id])

    const onEdit = e => {
        e.preventDefault()
        navigate(`/communities/edit/${community._id}`)
    }

    const onDelete = e => {
        e.preventDefault()
        posts.find(post => dispatch(adminDeletePost(post._id)))
        community.members.find(member => dispatch(kickMember(community._id, member.memberId)))
        // dispatch(deleteCommunityRequest(community._id))
    }

    return (
        community && (community.requested === true) &&
        <tr>
            <td>{community.communityName}</td>
            <td>{community.description}</td>
            <td>
                <button className="edit-btn" onClick={onEdit}>
                    EDIT
                </button>
            </td>
            <td>
                <button className="delete-btn" onClick={onDelete}>
                    DELETE
                </button>
            </td>
        </tr>
    )
}

export default AdminCommunityList