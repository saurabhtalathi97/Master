import React, {useState} from "react";
import { authenticate } from "../../helpers/AuthHelpers.jsx";
import { register } from "../../helpers/AuthHelpers.jsx";

import "./style.css"

const LoginSignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameLog, setUsernameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [color, setColor] = useState('');
    const [signUp, setSignUp] = useState(false);

    const auth = () => {
        console.log("a")
        if (usernameLog !== "" && passwordLog !== "") {
            authenticate(usernameLog, passwordLog).then(res => {
                if (res.data.id !== undefined) {
                    localStorage.setItem("id", res.data.id);
                    document.location.href = "/board";
                } else {
                    localStorage.removeItem("id")
                    setPasswordLog('')
                    alert("Username or password may be wrong !");
                }
            }).catch(err => {
                console.error("Request error " + err.message + " " + err.stack)
            })
        }else{
            alert("Please fill all the fields !");
        }
    }

    const confirmRegister = () => {
        if (username !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                register(username, password, color).then(r => {
                    setSignUp(false);
                    document.location.href = "/";
                })
            } else {
                alert("You didn't confirm your password !");
            }
        } else {
            alert("Your filled data are incorrect");
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                {(!signUp ?
                        (<div>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Nickname</label>
                        <input type="username" onChange={event => setUsernameLog(event.target.value)} className="form-control" placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={event => setPasswordLog(event.target.value)} className="form-control" placeholder="Enter password" />
                    </div>

                    <button onClick={auth} className="btn btn-primary btn-block">Submit</button>
                    <p onClick={() => setSignUp(true)} className="forgot-password text-right">
                        <a>Create an account ?</a>
                    </p>
                </div>)
            :
                (<div>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" onChange={event => setUsername(event.target.value)} placeholder="Enter a nickname" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={event => setPassword(event.target.value)} placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <label>Confirm password</label>
                        <input type="password" onChange={event => setConfirmPassword(event.target.value)} className="form-control" placeholder="Confirm password" />
                    </div>

                    <div className="form-group">
                        <label>Color</label>
                        <input type="color" onChange={event => setColor(event.target.value)} className="form-control" placeholder="Enter color" />
                    </div>

                    <button onClick={confirmRegister} type="submit" className="btn btn-primary btn-block">Sign Up</button>

                    <p onClick={() => setSignUp(false)} className="forgot-password text-right">
                        <a >Already registered sign in?</a>
                    </p>
                </div>)
            )}
            </div>
        </div>
    );}
export default LoginSignUp;