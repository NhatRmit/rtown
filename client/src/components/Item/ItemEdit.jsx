import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { getItemById, updateItem } from "../../actions/item";

const initialState = {
    name: '',
    Rpoint: 0,
}

const ItemEdit = ({ item, pullData }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState)
    const {
        name,
        Rpoint
    } = formData

    const [uploadFile, setUploadFile] = useState(null)

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    useEffect(() => {
        if (!item) {
            dispatch(getItemById(item._id));
        }
        if (item) {
            const textData = { ...initialState };
            for (const key in item) {
                if (key in textData) textData[key] = item[key];
            }
            setFormData(textData);
        }
    }, [item, dispatch])

    const onUpdate = (e) => {
        e.preventDefault()
        let formdata = new FormData();
        formdata.append("name", name);
        formdata.append("Rpoint", Rpoint);
        formdata.append("file", uploadFile);
        dispatch(updateItem(item._id, formdata))
        pullData(false)
    }

    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
    }

    return (
        <form className="form" onSubmit={onUpdate}>
            <input
                type="text"
                placeholder="Content"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input
                type="number"
                placeholder="Rpoint"
                name="Rpoint"
                value={Rpoint}
                onChange={onChange}
            />
            <input type="file" onChange={onChangeImage} />
            <input type="submit" className="btn btn-primary my-1" />
        </form>

    )

}

export default ItemEdit