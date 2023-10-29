import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
// import { useAuthr } from "../../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/AuthStyles.css";


const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [forgetKey, setforgetKey] = useState("");
    const [newPassword, setnewPassword] = useState("");
    // const [auth, setAuth] = useAuthr();
    // const Location = useLocation();

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/forgetPassword`, {
                email,
                forgetKey,
                newPassword,
            });
            console.log("res=============", res)
            if (res.data.success) {
                toast.success(res.data.message);
                // setAuth({
                //     ...auth,
                //     user: res.data.user,
                //     token: res.data.token,
                // });
                // localStorage.setItem("auth", JSON.stringify(res.data));
                // navigate(location.state || "/");
                // navigate(Location.state || "/");
                navigate("/Login");
            } else {
                toast.error(res.data.errorMsg);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !!!");
        }
    };
    return (
        <Layout title={"Forget Password - "} >
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
                            value={forgetKey}
                            onChange={(e) => setforgetKey(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Forget Key"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>


                    <button type="submit" className="btn btn-primary mb-3">
                        Reset Password
                    </button>

                </form>
            </div>
        </Layout>
    )
}

export default ForgetPassword