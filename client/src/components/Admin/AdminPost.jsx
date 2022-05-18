import React from "react";
import { useState } from "react";
import "./Admin.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import { useDispatch } from "react-redux";
import { adminDeletePost } from "../../actions/admin";
import EditPost from "../Post/EditPost";

const AdminPost = ({ post }) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false)
    const pullData = (data) => {
        setEdit(data)
    }

    const onDelete = e => {
        e.preventDefault();
        dispatch(adminDeletePost(post && post._id))
    }

    const onEdit = e => {
        e.preventDefault()
        setEdit(true)
    }

    return (
        <tr>
            <td>
                {
                    !edit ? post.text :
                        <EditPost singlePost={post} pullData={pullData} />
                }
            </td>
            <td><img src={post.image} alt="" style={{ width: "8rem" }} /></td>
            <td>
                <div onClick={onEdit}><EditButton /></div>
            </td>
            <td>
                <div onClick={onDelete}><DeleteButton /></div>
            </td>
        </tr>
    );
};

export default AdminPost;