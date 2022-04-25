import './ToTopButton.css'


const ToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
        <span onClick={scrollToTop} className="btn">TO TOP</span>
    )
}
export default ToTopButton;