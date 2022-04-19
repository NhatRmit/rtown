import './ToTopButton.css'


const ToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
    <button className="btn-wrapper">
        <div onClick={scrollToTop} className="btn">TO TOP</div>
    </button>
    )
}
export default ToTopButton;