
import './RequestForm.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCommunity, getCommunityById } from '../../actions/community';

const initialState = {
    communityName: '',
    description: ''
}

const EditCommunity = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { community_id } = useParams()
    const community = useSelector(state => state.community.community)

    const [formData, setFormData] = useState(initialState)

    const {
        communityName,
        description
    } = formData

    const onSubmit = e => {
        e.preventDefault()
        dispatch(updateCommunity(community_id, formData, navigate))
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onGoBack = e => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect(() => {
        if (!community) dispatch(getCommunityById(community_id))
        if (community) {
            const textData = { ...initialState };
            for (const key in community) {
                if (key in textData) textData[key] = community[key];
            }
            setFormData(textData);
        }
    }, [dispatch, community, community_id])

    return (
        <div className="requestform-container">
            <h1 className="title">Update Community Request</h1>
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

export default EditCommunity;