import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [favoriteSports, setfavoriteSports] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = '';
        console.log(name,
            email,
            password,
            phone,
            address,
            favoriteSports,
        )
        console.log(' process.env.REACT_APP_API', process.env.REACT_APP_API)
        try {
            res = await axios.post(`${process.env.REACT_APP_API}/auth/registrations`, {
                name,
                email,
                password,
                phone,
                address,
                favoriteSports,
            });
            console.log("res", res, res.data.success)
            console.log("res.data", res.data)
            if (res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                console.log("elase error", res.data);
                toast.error(res.data.errorMsg);
            }
        } catch (error) {
            console.log(error);
            console.log("error", res);
            console.log("error", res.data);
            // toast.error(res.data.errorMsg);
        }
    };

    return (
        <Layout title="Register - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Name"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
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
                    <div className="mb-3">
                        <input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Phone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Address"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={favoriteSports}
                            onChange={(e) => setfavoriteSports(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="What is Your Favorite sports"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        REGISTER
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
