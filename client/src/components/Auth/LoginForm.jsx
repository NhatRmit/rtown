
import style from "./LoginForm.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../actions/auth";

const LoginForm = () => {
    const [idOrEmail, setIdOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert("Form submitted");
        dispatch(loginUser(idOrEmail, password))
    }

    if(isAuthenticated) {
        return <Navigate replace to='/newsfeed' />
    }

    return (
        <div className={style["loginform-container"]}>
            <h1 className={style["h1"]}>Welcome to RMIT Town!</h1>
            <p className={style["intro"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin dictum nulla eu hendrerit. Donec commodo fringilla sollicitudin. Duis sit amet ligula quis tellus scelerisque pulvinar ut vitae ligula. Phasellus lectus felis, convallis sit amet consequat quis, interdum eu lectus. Suspendisse potenti.</p>
            <form className={style["form"]} onSubmit={handleSubmit} action="/login" method="POST">
                <label className={style["label"]}>RMIT ID or Email address</label>
                <input
                    type="text"
                    placeholder="Enter your RMIT ID or Email address"
                    value={idOrEmail}
                    required
                    onChange={(e) => setIdOrEmail(e.target.value)}
                    className={style["input"]}
                />

                <label className={style["label"]}>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className={style["input"]}
                />
                <input type='submit' />
            </form>
            <p className={style["p"]}>By signing in, you accept <a className={style["a"]}>the rules of use of RMIT systems.</a></p>
            <div className={style["button-wrapper"]}>
                <button type='submit' className={style["register-btn"]}>Sign in</button>
            </div>
            <Link to="/" className={style["link"]}>Forgot your password?</Link>

        </div>
    );
};

export default LoginForm;