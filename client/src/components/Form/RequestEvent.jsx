import React, { useState } from 'react'
import Layout from '../Layout'
// import Filter from '../components/Filter/Filter'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent } from '../../actions/post'

const RequestEvent = ({ community }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { community_id } = useParams()

    const [formData, setFormData] = useState({
        // name: community.communityName,
        text: '',
        RPoint: 0,
    })

    const {
        // name,
        text,
        RPoint
    } = formData

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createEvent(formData, community._id, navigate))
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onGoBack = e => {
        e.preventDefault()
        navigate(-1)
    }
    return (
        <Layout header footer>

            <div className="requestform-container">
                <h1 className="title">Event Request</h1>
                <form className="form" onSubmit={onSubmit} >
                    <div className='communityName'>
                        <label className="label">Event Content</label>
                        <input
                            type="text"
                            placeholder="Enter your community name"
                            value={text}
                            required
                            onChange={onChange}
                            name='text'
                        />
                    </div>
                    <div className='communityName'>
                        <label className="label">Event RPoint</label>
                        <input
                            type="number"
                            placeholder="Enter your community name"
                            value={RPoint}
                            required
                            onChange={onChange}
                            name='RPoint'
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
                    {/* 
                    <div className='communityDescription'>
                        <label className="label">Community Description</label>
                        <textarea
                            placeholder="Describe your community"
                            value={description}
                            required
                            onChange={onChange}
                            name='description'
                        />
                    </div> */}
                    <div className="btn-wrapper">
                        <button type='submit' className="submit-btn">Submit</button>
                        <button onClick={onGoBack} className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </Layout >

    )
}

export default RequestEvent