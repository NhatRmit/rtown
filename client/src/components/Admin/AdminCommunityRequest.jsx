import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllCommunityRequest, deleteCommunityRequest } from "../../actions/admin"
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";


const AdminCommunityRequest = ({ community }) => {
    const dispatch = useDispatch();
    // const comunities = useSelector(state => state.community.communities)

    // useEffect(() => {
    //     dispatch(adminGetAllCommunityRequest());
    // }, [dispatch])

    const onDelete = e => {
        e.preventDefault()
        dispatch(deleteCommunityRequest(community._id))
    }
    return (
        <> {
            community && !community.requested &&
            <tr>
                <td>{community.communityName}</td>
                <td>{community.description}</td>
                <td>
                    <EditButton />
                </td>
                <td>
                    <div onClick={onDelete}><DeleteButton /></div>
                </td>
            </tr>



        }
        </>
    )
}

export default AdminCommunityRequest