import React, { useState, useEffect } from 'react';
import '../Css/login.css';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WelcomeAnimation = () => {
    const [displayLetters, setDisplayLetters] = useState([]);

    useEffect(() => {
        const word = "Discover a World of Shopping Convenience 🎁";
        const letters = word.split('');
        const interval = setInterval(() => {
            setDisplayLetters(prevLetters => [...prevLetters, letters[prevLetters.length]]);
            if (displayLetters.length === letters.length) clearInterval(interval);
        }, 100);

        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <div className="welcome-animation">
                <h6 className='animation-h'>
                    {displayLetters.map((letter, index) => (
                        <span className='animation' key={index} style={{ animationDelay: `${index * 0.5}s` }}>
                            {letter}
                        </span>
                    ))}
                </h6>
            </div>
        </>
    )
}

const Login = () => {

    const nav = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        let key = {
            email: email,
            password: password
        }

        axios.post("http://localhost:3001/auth/login", key)
            .then(res => {
                console.log(res)
                if(res.data.message === "user_not_found"){
                    toast.info("User Not Found")
                }
                else if(res.data.message === "check_password"){
                    toast.warning("Check The Username Are Password")
                }
                else if(res.data.message === "login_success"){
                    toast.success("Login SuccessFully")

                    localStorage.setItem("userId",res.data.userID)

                    setTimeout(() => {
                        nav('/online-shopping/project-in/93.61.06.00/109601639/home')
                      },6000);
                }
            })
            

    }


    return (
        <>
            <section className='react-login'>
                <div className="login-container">
                    <div className="login-form">
                        <div className="profile-circle">
                            <img src='https://cdn-icons-png.freepik.com/512/10302/10302971.png' alt='loading' height='180px' width='180px' />
                        </div>
                        <WelcomeAnimation />
                        <h2 className='login-head'>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <ToastContainer/>
                            <div className="form-group">
                                <input type="email" name="email" id='email' className='login-input'
                                    placeholder="Email" required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={showPassword ? 'text' : 'password'} name="password" id='password' className='login-input'
                                    placeholder="Password" required />
                                <span className="show-password" onClick={togglePasswordVisibility}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </span>
                            </div>
                            <a href='/online-shopping/project-in/93.61.06.00/register' className='login-register'>create account !</a>
                            <button className='login-btn'>login</button>
                        </form>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Login;
export { WelcomeAnimation };