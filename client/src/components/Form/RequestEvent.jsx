import React, { useEffect, useState, useRef } from 'react'
import Layout from '../Layout'
// import Filter from '../components/Filter/Filter'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent } from '../../actions/post'
import Flatpickr from "react-flatpickr";

const RequestEvent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { community_id } = useParams()

    const [formData, setFormData] = useState({
        text: '',
        Rpoint: 0,
    })

    const [endTime, setEndTime] = useState(null)
    const [uploadFile, setUploadFile] = useState(null)

    const {
        text,
        Rpoint,
    } = formData

    const onEvent = e => {
        e.preventDefault()
        let formdata = new FormData();
        formdata.append("file", uploadFile);
        formdata.append("text", text);
        formdata.append("Rpoint", Rpoint);
        formdata.append("endTime", endTime);
        dispatch(createEvent(formdata, community_id, navigate))
    }
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onChangeTime = (e, time) => {
        // setEndTime({ [e.target.name]: e.target.value })
        setEndTime(time)
        // setDate(endTime)
    }

    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
    }

    const onGoBack = e => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <Layout header footer>
            <div className="requestform-container">
                <h1 className="title">Event Request</h1>
                <form className="form" onSubmit={onEvent} >
                    <div className='communityName'>
                        <label className="label">Event Content</label>
                        <input
                            type="text"
                            placeholder="Enter name of event"
                            value={text}
                            required
                            onChange={onChange}
                            name='text'
                        />
                    </div>
                    <div className='communityName'>
                        <label className="label">Event RPoint</label>
                        <input
                            type="text"
                            placeholder="Enter Rpoint"
                            value={Rpoint}
                            required
                            onChange={onChange}
                            name='Rpoint'
                        />
                    </div>
                    {/* <input type="text" value={date} name="date" /> */}
                    <div>
                        <Flatpickr
                            data-enable-time
                            value={endTime}
                            onChange={onChangeTime}
                            options={
                                {
                                    minDate: 'today'
                                }
                            }
                        />
                    </div>
                    <input type="file" onChange={onChangeImage}/>

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