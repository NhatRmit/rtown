import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { buyItem, getItemByProfile } from '../../actions/item'
import Modal from 'react-modal'
import "./Buttons.css"

const RedeemButton = ({ item }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const auth = useSelector(state => state.auth._id)

    const onRedeem = e => {
        e.preventDefault()
        dispatch(buyItem(item._id, navigate, auth))
        setIsOpenModal(false)
        // dispatch(getItemByProfile())
    }

    const openModal = e => {
        // e.preventDefault()
        setIsOpenModal(true)
    }

    const closeModal = e => {
        // e.preventDefault()
        setIsOpenModal(false)
    }
    return (
        <>
            <button onClick={openModal} className="redeem-btn">
                Redeem
            </button>

            <Modal
                style={{
                    overlay: {
                        marginTop: "10rem",
                        marginLeft: "30rem", 
                        width: "40%",
                        height: "40%",
                    }
                }}
                isOpen={isOpenModal}
                // onAfterOpen={}
                onRequestClose={closeModal}
                contentLabel="Redeem"
            >
                <h1>Are you sure you want to redeem {item.name}?</h1>
                <div style={{margin: "3rem"}}>
                    <button className="join-btn" onClick={onRedeem}>Sure</button>
                    <button className="createEvent-btn" onClick={closeModal}>Cancel</button>
                </div>

            </Modal>

        </>
    )
}

export default RedeemButton;