
import './RequestForm.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCommunity } from '../../actions/community';

const RequestForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [uploadFile, setUploadFile] = useState(null)
    const [formData, setFormData] = useState({
        communityName: '',
        description: ''
    })

    const {
        communityName,
        description
    } = formData
    const onCreate = e => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("file", uploadFile);
        formdata.append("communityName", communityName);
        formdata.append("description", description);
        dispatch(addCommunity(formdata, navigate))
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
    }

    const onGoBack = e => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <div className="requestform-container">
            <h1 className="title">Create Community Request</h1>
            <form className="form" onSubmit={onCreate} >
                <div className='communityName'>
                    <label className="label">Community Name</label>
                    <input
                        type="text"
                        placeholder="Enter your community name"
                        value={communityName}
                        required
                        onChange={onChange}
                        name='communityName'
                    />
                </div>

                <div className='communityDescription'>
                    <label className="label">Community Description</label>
                    <textarea
                        placeholder="Describe your community"
                        value={description}
                        required
                        onChange={onChange}
                        name='description'
                    />
                </div>
                <input type="file" onChange={onChangeImage} />
                <div className="btn-wrapper">
                    <button type='submit' className="submit-btn">Submit</button>
                    <button onClick={onGoBack} className="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default RequestForm;