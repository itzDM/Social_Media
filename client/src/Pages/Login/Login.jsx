import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import "./Login.scss";

const Login = () => {


  const [err, setErr] = useState(null);


  const [inputs, setInputs] = useState({
    userName: "",
    password: ""
  });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handelInput = (e) => {

    setInputs((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    if ((inputs.userName.length === 0) || (inputs.password.length === 0)) return setErr("Please Fill All Field");
    try {

      await login(inputs);
      navigate("/");
    } catch (error) {

      console.log(error);

      setErr(error.response.data);
    }

  };

  return (
    <div className='login'>
      <div className="log-container">
        <form>
          <h2>Login</h2>
          <input type="text" placeholder='username' name='userName' onChange={handelInput} required />
          <input type="password" placeholder='password' name='password' onChange={handelInput} required />
          <button onClick={handelLogin}>Login</button>
          {err && <span style={{ color: "#ff0000b5" }}>{err}</span>}
          <span style={{ fontSize: "13px" }}> &#9432; If no error show After Login Click, Please Retry </span>
          <span>Do't have an Account <Link to="/register">Create One.</Link></span>

        </form>
      </div>
    </div>
  );
};

export default Login;