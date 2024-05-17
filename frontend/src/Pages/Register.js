import React, { useState } from 'react';
import '../Css/register.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const nav = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phno = document.getElementById("phno").value;
        let password = document.getElementById("password").value;
        let confirmps = document.getElementById("confirm-ps").value;

        console.log(name, email, phno, password, confirmps);
        
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage("Password pattern not correct");
            return; // Stop further execution if password pattern is incorrect
        } else {
            setErrorMessage("");
        }

        if (password === confirmps) {
            let key = {
                name: name,
                email: email,
                phno: phno,
                password: password
            };

            axios.post("http://localhost:3001/auth/register", key)
                .then(res => {
                    console.log(res);
                    if (res.data.message === "User registered successfully") {
                        toast.success("Register Successfully");
                        setTimeout(() => {
                            nav('/');
                        }, 6000);                      
                    } else if (res.data.message === "user_already_exists") {
                        toast.info("User Already Exists");
                    }
                })
                .catch(error => {
                    console.error("Error registering user:", error);
                    toast.error("An error occurred while registering. Please try again later.");
                });
        } else {
            toast.warning("Please check the password");
        }
    };

    return (
        <>
            <section className='react-register'>
                <div className="register-container">
                    <div className="register-form">
                        <h2 className='register-head'>Create Your Account</h2>
                        <form onSubmit={handleSubmit}>
                            <ToastContainer />
                            {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}
                            <div className="form-group">
                                <input className='register-input' type="text" name="name" id='name'
                                    placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <input className='register-input' type="email" name="email" id='email'
                                    placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <input className='register-input' type="number" name="phone" id='phno'
                                    placeholder="Your Number" required />
                            </div>
                            <div className="form-group">
                                <input className='register-input' type="password" name="password" id='password'
                                    placeholder=" Your Password" required />
                                <p style={{ color: "lightblue", fontSize: "14px", paddingTop: "5px" }}> It should contain 8 characters and at least 1 uppercase letter, 1 lowercase letter, and 1 number</p>
                            </div>
                            <div className="form-group">
                                <input className='register-input' type="password" name="confirmPassword" id='confirm-ps'
                                    placeholder="Confirm Password" required />
                            </div>
                            <div className="form-group">
                                <label>
                                    <input className='register-input' type="checkbox" name="agreementChecked" required />
                                    I agree to the Terms of Service
                                </label>
                            </div>
                            <button className='register-btn' type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
