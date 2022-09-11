import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth/AuthService";
import "./SignIn.css";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isLoggedin == true) {
      // AuthService.setToken(res.data.token);
      // AuthService.setUser(res.data.user);

      navigate("/home");
    }
  }, [isLoggedin]);

  const onSubmit = (data) => {
    AuthService.loginByEmailPassword(data)
      .then((res) => {
        AuthService.setToken(res.data);
          if (res.status === 200) {
            return setIsLoggedIn(true);
          } else {
            alert("Enter a valid Username & Password");
          }
       
      })
      .catch((err) => {
        alert("Enter a valid Username & Password");
      });
  };

  return (
    <div className="container log-in-container">
      <div className="row">
        <div className="col-8 m-auto card shadow p-8 mb-9 bg-body rounded login-card">
          <div className="container log-in-card-body">
            <div className="row total-card">
              <div className="col-md-6 left-bg text-white left-card-body text-center">
                <h2 className="mt-4">Welcome to LAZOT</h2>
                <div className="justify-content-center msg-custom">
                  <span>
                    To keep connected with us please visit our website
                  </span>
                </div>
              </div>
              <div className="col-md-6 right-bg right-card-body text-center">
                <h2 className="text-muted">Login Account</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <p>Please use your Email ID to login</p>
                  <div className="input-group sign-in-input">
                    <div className="form-group mt-2 sign-in-form">
                      <input
                        type="text"
                        {...register("username")}
                        placeholder="Username"
                        className="form-control sign-in-from-control"
                      />
                    </div>
                    <div className="form-group mt-2 sign-in-form">
                      <input
                        type="password"
                        {...register("password")}
                        placeholder="Password"
                        className="form-control sign-in-from-control"
                      />
                    </div>
                  </div>
                  <a href="/">
                    <button
                      className="btn btn-sm btn-info text-white text-bold round-btn mt-2 sign-in-button"
                      type="submit"
                    >
                      SIGN IN
                    </button>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
