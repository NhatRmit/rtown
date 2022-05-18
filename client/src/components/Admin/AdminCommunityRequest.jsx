import React from "react";
import { useDispatch,  } from "react-redux";
import { deleteCommunityRequest, adminAcceptCommunityRequest } from "../../actions/admin"

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
                <img src={community.avatar} alt="" style={{width: "8rem"}}/>
            </td>
            <td>
                <button className="edit-btn" onClick={onAccept}>
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