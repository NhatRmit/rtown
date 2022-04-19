
import './RequestForm.css';
import {useState} from "react";
import axios from 'axios';

const RequestForm = () => {
    const [communityName, setCommunityName] = useState("");
    const [communityPurpose, setCommunityPurpose] = useState(["Entertainment", "Club", "Studying", "Hobbies"]);
    const [communityDescription, setCommunityDescription] = useState("");

    const Add = communityPurpose.map(Add => Add)
    const handlePurposeChange = (e) => console.log((communityPurpose[e.target.value]))

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            communityName: this.communityName,
            communityPurpose: this.communityPurpose,
            communityDescription: this.communityDescription
        }

        axios.post('localhost:3000/community-request', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    return (
       <div className="requestform-container">
            <h1 className="title">Create Community Request</h1>
            <form className="form" onSubmit={handleSubmit} >
                <div className='communityName'>
                    <label className="label">Community Name</label>
                    <input
                        type="text"
                        placeholder="Enter your community name"
                        value={communityName}
                        required
                        onChange={(e) => setCommunityName(e.target.value)}
                    />
                </div>
                    
                <div className='communityPurpose'>
                    <label for="purposes" className="label">Purpose of Community</label>
                    <select 
                    onChange={e => handlePurposeChange(e)}
                    className="purposeList">
                    {
                        Add.map((address, key) => <option value={key}>{address}</option>)
                    }
                    </select>
                </div>
            
                <div className='communityDescription'>
                    <label className="label">Community Description</label>
                    <textarea
                        placeholder="Describe your community"
                        value={communityDescription}
                        required
                        onChange={(e) => setCommunityDescription(e.target.value)}
                    /> 
                </div>
                <div className="btn-wrapper">
                    <button className="submit-btn">Submit</button>
                    <button className="cancel-btn">Cancel</button>
                </div>      
            </form>  
        </div> 
    );
};

export default RequestForm;