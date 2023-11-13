// import React from "react";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// location
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import "../../styles/AuthStyles.css";
import { useAuthr } from "../../context/auth";
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuthr();
    const Location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
                email,
                password,
            });
            console.log("res=============", res)
            if (res.data.success) {
                toast.success(res.data.message, {
                    position: "top-left",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                // navigate(location.state || "/");
                navigate(Location.state || "/");
            } else {
                toast.error(res.data.errorMsg, {
                    position: "top-left",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !!!", {
                position: "top-left",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    };

    return (

        <Layout title="Register - ">
            <div className="form-container " toaster style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit} >
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>


                    <button type="submit" className="btn btn-primary mb-3">
                        LOGIN
                    </button>
                    <div className="mb-3">
                        <button
                            type="button"
                            className="btn forgot-btn"
                            onClick={() => {
                                navigate("/ForgetPassword");
                            }}
                        >
                            Forgot Password
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
