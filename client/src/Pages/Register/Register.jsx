import React, { useContext } from 'react';
import { useState } from 'react';
import "./Register.scss";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Register = () => {

    const { register } = useContext(AuthContext);

    const navigate = useNavigate();

    const [err, setErr] = useState(null);

    const [input, setInput] = useState({
        userName: "",
        name: "",
        password: "",
        email: ""
    });


    const handelInput = (e) => {
        setInput((p) => ({ ...p, [e.target.name]: e.target.value }));

    };


    const handelRegister = async (e) => {
        e.preventDefault();
        if ((input.userName.length === 0) || (input.password.length === 0) || (input.name.length === 0) || (input.email.length === 0)) return setErr("Please Fill All Field");

        try {
            await register(input);
            navigate("/");

        } catch (error) {
            setErr(error.response.data);
        }

        console.log(err);


    };

    return (

        <div className='register'>
            <div className="reg-container">
                <form >
                    <h2>Register</h2>
                    <input type="text" placeholder='Enter Your User Name' name='userName' onChange={handelInput} />
                    <input type="text" placeholder='Enter Your Name' name='name' onChange={handelInput} />
                    <input type="email" placeholder='Enter Your email' name='email' onChange={handelInput} />
                    <input type="password" placeholder='Enter Your password' name='password' onChange={handelInput} />
                    <button onClick={handelRegister}>Register</button>
                    {err && <span style={{ color: "#ff0000b5" }} >{err}</span>}
                    <span>Already have an Account Please <Link to="/login">Login.</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Register;