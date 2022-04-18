import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { addCommunity, updateCommunity } from '../../actions/community'

const initialFormData = {
    communityName: '',
    description: ''
}

const CreateCommunity = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialFormData)

    const {
        communityName,
        description
    } = formData

    const onSubmit = e => {
        e.preventDefault()
        dispatch(addCommunity(formData, navigate))
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section className='container-community-form'>
            <h1 className="large text-primary">
                'Creating a Community'
            </h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="communityName"
                        name="communityName"
                        value={communityName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="description"
                        name="description"
                        value={description}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="" />
            </form>
        </section>
    )
}

export default CreateCommunity