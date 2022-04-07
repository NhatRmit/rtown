import LoginLayout from "../LoginLayout";
import style from "./LoginForm.module.css";
import {useState} from "react";


const LoginForm = () => {
    const [idOrEmail, setIdOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted");
    }

    return (
        <LoginLayout className={style["register-container"]} header footer>
       <div className={style["loginform-container"]}>
           <div className={style["loginform-wrapper"]}>
                <form className={style["form"]} onSubmit={handleSubmit}>
                    <h1 className={style["h1"]}>Welcome to RMIT Town!</h1>
                    <p className={style["p"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin dictum nulla eu hendrerit. Donec commodo fringilla sollicitudin. Duis sit amet ligula quis tellus scelerisque pulvinar ut vitae ligula. Phasellus lectus felis, convallis sit amet consequat quis, interdum eu lectus. Suspendisse potenti.</p>
                    <label className={style["label"]}>RMITID or Email address</label>
                    <input
                        type="text"
                        value={idOrEmail}
                        onChange={(e) => setIdOrEmail(e.target.value)}
                        className={style["input"]} 
                        />
                    <label className={style["label"]}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={style["input"]} 
                    /> 
                </form>
                <p className={style["p"]}>By signing in, you accept <a className={style["a"]}>the rules of use of RMIT systems.</a></p>
                <div className={style["button-wrapper"]}>
                    <button className={style["register-btn"]}>SIGN IN</button>
                </div>
            </div>
        </div> 
        </LoginLayout>
    );
};

export default LoginForm;