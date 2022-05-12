import React from "react";
import { useState, useEffect } from "react";
import "./Admin.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../actions/item";

const AdminItem = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items)

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch])

    const onDelete = e => {
        e.preventDefault();
        
    }

    return (
        <>
            <div className='addAdmin-section'>
                <table className="table">
                    <tr>
                        <th>Item</th>
                        <th>Rpoint</th>
                        <th>Image</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                    {
                        items.map(item =>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.Rpoint}</td>
                                <td><img src={item.image} alt="" style={{width: "2rem"}}/></td> 
                                <td>
                                    <EditButton />
                                </td>
                                <td>
                                    <DeleteButton onClick={onDelete}/>
                                </td>
                            </tr>
                        )
                    }

                </table>
            </div>
        </>
    );
};

export default AdminItem;
