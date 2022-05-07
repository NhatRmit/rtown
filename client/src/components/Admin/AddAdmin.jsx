import React from "react";
import {useState} from "react";
import "./Admin.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";

const AddAdmin = () => {
  return (
    <>
      <div className='addAdmin-section'>
        <table className="table">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
          <tr>
            <td>1</td>
            <td>ABC</td>
            <td>ABC1234@gmail.com</td>
            <td>
              <EditButton />
            </td>
            <td>
              <DeleteButton />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>ABC</td>
            <td>ABC1234@yahoo.com</td>
            <td>
              <EditButton />
            </td>
            <td>
              <DeleteButton />
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default AddAdmin;
