import React, { useState } from "react";
import "./login.css";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: null,
    password: null,
  });

  const updateUser = (ev) => {
    let newUser = { ...user };
    newUser[ev.target.name] = ev.target.value;

    setUser(newUser);
  };

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const submitUser = (ev) => {
    ev.preventDefault();
    let errorMessages = {
      email: null,
      password: null,
    };

    if (user.password !== "Admin@123") {
      errorMessages.password = "You entered an invalid password";
    } else if (!validateEmail(user.email)) {
      errorMessages.email = "You entered an invalid email";
    }

    console.log("Error", errorMessages);
    setError(errorMessages);
  };

  return (
    <div className="landing-page">
      <div className="login-card">
        <h1 className="login-card__title"> User Login</h1>

        <form className="login-card__form" onSubmit={submitUser}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              value={user.email}
              className="default-input input--width"
              required
              placeholder="Email"
              onChange={updateUser}
            />
            <div className="message-danger">{error.email}</div>
          </div>

          <div className="input-container">
            <input
              name="password"
              type="password"
              className="default-input input--width"
              required
              value={user.password}
              placeholder="Password"
              onChange={updateUser}
            />

            <div className="message-danger">{error.password}</div>
          </div>

          <button type="submit" className="default-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
