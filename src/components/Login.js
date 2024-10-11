import React, { useState } from "react";
import {useNavigate } from "react-router-dom";

const Login = (props) => {
  const {showAlert}=props;
  const [creds, setCreds] = useState({ email: "", password: "" });
  const navigate=useNavigate();
  

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
      
      e.preventDefault();
      //API call
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
          method: "POST",
          headers: {
              "Content-Type":"application/json",
            },
            body: JSON.stringify({
                email:creds.email,
                password:creds.password
            }),
        });

        const json=await response.json()
        if(json.success){
            console.log(json.authToken)
            // Storing token in local storge
            localStorage.setItem('token',json.authToken);
            //redirecting to home
            navigate('/')
            showAlert("Logged in successfully!","success")

        }
        else{
            showAlert("Invalid Credentials !","danger")

        }
  };
  return (
    <div className=" mt-3">
      <h2>Login to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            value={creds.email}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={creds.password}
            type="password"
            name="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
