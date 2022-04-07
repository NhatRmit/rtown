import style from "./LoginFooter.module.css";
import {Link} from "react-router-dom";

const LoginFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style["loginform-footer"]}>
            <div className={[style["copyright"]]}>Copyright &copy; {currentYear} RMIT Town. All Rights Reserved.</div>
            <div className={style["footer-nav"]}>
                <Link to="/">Disclaimer</Link>
                <div className={style["vl"]}></div>
                <Link to="/">Terms</Link>
                <div className={style["vl"]}></div>
                <Link to="/">Privacy</Link>
            </div>
      </footer>
  )
}

export default LoginFooter