import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { deleteCommunityRequest, adminAcceptCommunityRequest} from "../../actions/admin"
import { setRandomFallback } from "bcryptjs";



const AdminCommunityList = ({community}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const comunities = useSelector(state => state.community.communities)

    // useEffect(() => {
    //     dispatch(adminGetAllCommunityRequest());
    // }, [dispatch])
    const onEdit = e => {
        e.preventDefault()
        navigate(`/communities/edit/${community._id}`)
      }

    const onDelete = e => {
        e.preventDefault()
        dispatch(deleteCommunityRequest(community._id))
        
    }


    return (
        <> {
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
                        <button className="delete-btn" onClick ={onDelete}>
                            DELETE
                        </button>
                        </td>
                </tr>
            }
        </>
    )
}

export default AdminCommunityList