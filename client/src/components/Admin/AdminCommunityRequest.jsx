import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllCommunityRequest, deleteCommunityRequest, adminAcceptCommunityRequest } from "../../actions/admin"



const AdminCommunityRequest = ({ community }) => {
    const dispatch = useDispatch();
    const onDelete = e => {
        e.preventDefault()
        dispatch(deleteCommunityRequest(community._id))
    }

    const onAccept = e => {
        e.preventDefault()
        dispatch(adminAcceptCommunityRequest(community._id))
    }
    return (
        community && !community.requested &&
        <tr>
            <td>{community.communityName}</td>
            <td>{community.description}</td>
            <td>
                <button className="delete-btn" onClick={onAccept}>
                    ACCEPT
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

export default AdminCommunityRequest