import React from "react";
import { useState, useEffect } from "react";
import "./Admin.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../actions/item";

const AdminItem = ({ item }) => {
    const dispatch = useDispatch();

    const onDelete = e => {
        e.preventDefault();
        dispatch(deleteItem(item._id))
    }

    return (
        <>
            <tr>
                <td>{item.name}</td>
                <td>{item.Rpoint}</td>
                <td><img src={item.image} alt="" style={{ width: "2rem" }} /></td>
                <td>
                    <EditButton />
                </td>
                <td>
                    <div onClick={onDelete}><DeleteButton /></div>
                </td>
            </tr>
        </>

    );
};

export default AdminItem;