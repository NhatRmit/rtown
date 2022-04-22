
import './RequestForm.css';
import {useState} from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCommunity } from '../../actions/community';

const RequestForm = () => {
    // const [communityName, setCommunityName] = useState("");
    // const [communityPurpose, setCommunityPurpose] = useState(["Entertainment", "Club", "Studying", "Hobbies"]);
    // const [communityDescription, setCommunityDescription] = useState("");

    // const Add = communityPurpose.map(Add => Add)
    // const handlePurposeChange = (e) => console.log((communityPurpose[e.target.value]))

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const data = {
    //         communityName: this.communityName,
    //         communityPurpose: this.communityPurpose,
    //         communityDescription: this.communityDescription
    //     }

    //     axios.post('localhost:3000/community-request', data)
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        communityName: '',
        description: ''
    })

    const {
        communityName,
        description
    } = formData

    const onSubmit = e => {
        e.preventDefault()
        dispatch(addCommunity(formData, navigate))
    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onGoBack = e => {
        e.preventDefault()
        navigate(-1)
    }
    
    return (
       <div className="requestform-container">
            <h1 className="title">Create Community Request</h1>
            <form className="form" onSubmit={onSubmit} >
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
                    
                {/* <div className='communityPurpose'>
                    <label for="purposes" className="label">Purpose of Community</label>
                    <select 
                    onChange={e => handlePurposeChange(e)}
                    className="purposeList">
                    {
                        Add.map((address, key) => <option value={key}>{address}</option>)
                    }
                    </select>
                </div> */}
            
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
                <div className="btn-wrapper">
                    <button type='submit' className="submit-btn">Submit</button>
                    <button onClick={onGoBack} className="cancel-btn">Cancel</button>
                </div>      
            </form>  
        </div> 
    );
};

export default RequestForm;