import style from "./LoginFooter.css";
import {Link} from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style["footer"]}>
            
            <div className={[style["copyright"]]}>Copyright &copy; {currentYear} RMIT Town. All Rights Reserved.</div>
            
            <div className={style["footer-nav"]}>
                <div className={style["footer-wrapper"]}>
                    <Link to="/">About Us</Link>
                    <Link to="/">Our Communities</Link>
                </div>

                <div className={style["footer-wrapper"]}>
                    <Link to="/">Disclaimer</Link>
                    <Link to="/">Terms</Link>
                    <Link to="/">Contact Us</Link>
                </div>

                <div className={style["footer-wrapper"]}>
                    <Link to="/">Content Policy</Link>
                    <Link to="/">Privacy Policy</Link>
                    <Link to="/">R-Points Policy</Link>
                </div>
            </div>
      </footer>
  )
}

export default Footer