import React from "react";
import { useState, useEffect } from "react";
import "./Admin.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../actions/item";
import ItemEdit from '../Item/ItemEdit'

const AdminItem = ({ item }) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false)
    const pullData = (data) => {
        setEdit(data)
    }

    const onDelete = e => {
        e.preventDefault();
        dispatch(deleteItem(item._id))
    }

    const onEdit = e => {
        e.preventDefault()
        setEdit(true)
    }

    return (
        <tr>
            <td>
                {
                    !edit ? item.name :
                        <ItemEdit item={item} pullData={pullData} />
                }
            </td>
            <td>{item.Rpoint}</td>
            <td><img src={item.image} alt="" style={{ width: "2rem" }} /></td>
            <td>
                <div onClick={onEdit}><EditButton /></div>
            </td>
            <td>
                <div onClick={onDelete}><DeleteButton /></div>
            </td>
        </tr>
    );
};

export default AdminItem;