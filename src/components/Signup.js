import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const {showAlert}=props;
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();


  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //API call
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: creds.name,
        email: creds.email,
        password: creds.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      // Storing token in local storge
      localStorage.setItem("token", json.authToken);
      //redirecting to home
      navigate("/");
      showAlert("Created account successfully!","success")

    } else {
      showAlert("Invalid Credentials !","danger")

    }
    console.log(json)

  };
  return (
    <div className=" mt-3">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={onChange}
            value={creds.name}
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            minLength={5}
            required
          />
        </div>
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm password
          </label>
          <input
            onChange={onChange}
            value={creds.cpassword}
            type="cpassword"
            name="cpassword"
            className="form-control"
            id="password"
            minLength={5}
            required
          />
        </div>

        <button
          disabled={creds.password !== creds.cpassword}
          type="submit"
          className="btn btn-primary"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
