import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommunityRequest, adminDeletePost } from "../../actions/admin"
import { clearCommunityData } from "../../actions/community";
import { getCommunityPosts } from "../../actions/post";

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
        posts.forEach(
            post => dispatch(adminDeletePost(post._id))
        )
        community.members.forEach(
            member => dispatch(clearCommunityData(community._id, member.memberId))
        )
        dispatch(deleteCommunityRequest(community._id))
    }



    return (
        community && (community.requested === true) &&
        <tr>
            <td>{community.communityName}</td>
            <td>{community.description}</td>
            <td>
                <img src={community.avatar} alt="" style={{width: "8rem"}}/>
            </td>
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