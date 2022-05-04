import "./LoginFooter.css";
import {Link} from "react-router-dom";

const LoginFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="loginform-footer">
            <div className="copyright">Copyright &copy; {currentYear} RMIT Town. All Rights Reserved.</div>
            <div className="footer-nav">
                <Link to="/disclaimer" className="footer-link">Disclaimer</Link>
                <div className="vl"></div>
                <Link to="/tos" className="footer-link">Terms</Link>
                <div className="vl"></div>
                <Link to="/privacy-policy" className="footer-link">Privacy</Link>
            </div>
      </footer>
  )
}

export default LoginFooter