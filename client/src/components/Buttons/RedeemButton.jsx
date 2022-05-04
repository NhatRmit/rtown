import { useState } from 'react'
import { useDispatch } from "react-redux";
import { buyItem } from '../../actions/item'
import Modal from 'react-modal'
import "./Buttons.css"

const RedeemButton = ({ item }) => {
    const dispatch = useDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const onRedeem = e => {
        e.preventDefault()
        dispatch(buyItem(item._id))
        setIsOpenModal(false)
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
                isOpen={isOpenModal}
                // onAfterOpen={}
                onRequestClose={closeModal}
                contentLabel="Redeem"
            >
                <h1>Are you sure you want to redeem {item.name}?</h1>
                <button onClick={onRedeem}>Sure</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>

        </>
    )
}

export default RedeemButton;