
import style from "./LoginForm.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../actions/auth";

const LoginForm = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const admin = useSelector(state => state.auth.admin)
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(usernameOrEmail, password))
    }

    if (!admin && isAuthenticated){
        return <Navigate replace to='/newsfeed' />
    }

    if (admin && isAuthenticated){
        return <Navigate replace to='/admin-profile' />
    }


    return (
        <div className={style["loginform-container"]}>
            <h1 className={style["h1"]}>Welcome to RMIT Town!</h1>
            <p className={style["intro"]}>This is where you can spark discussion to raise your voice. Please add your details with your existing account by RMIT and you will be able to login. If you cannot login, please contact support from RMIT IT department. </p>
            <form className={style["form"]} onSubmit={handleSubmit} >
                <label className={style["label"]}>RMIT ID or Email address</label>
                <input
                    type="text"
                    placeholder="Enter your RMIT ID or Email address"
                    value={usernameOrEmail}
                    required
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                <div className="rules">
                    <p className={style["p"]}>By signing in, you accept </p>
                    <p className={style["a"]} onClick={() => window.open('https://policies.rmit.edu.au')}>the rules of use of RMIT systems.</p>
                </div>
                
                <div className={style["button-wrapper"]}>
                    <button type='submit' className={style["login-btn"]}>Sign in</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;