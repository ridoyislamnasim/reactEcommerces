import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Menu/UserMenu'
import { useAuthr } from '../../context/auth'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
    const [auth, setAuth] = useAuthr();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    console.log('auth', auth);
    useEffect(() => {
        if (auth?.user) {
            const { name, email, phone, address } = auth?.user
            setName(name)
            setEmail(email)
            setPhone(phone)
            setAddress(address)
        }
    }, [auth]);
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        console.log(name,
            email,
            password,
            phone,
            address,
        )
        console.log(' process.env.REACT_APP_API', process.env.REACT_APP_API)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/profile-update`, {
                name,
                email,
                password,
                phone,
                address,
            });
            console.log("res", res, res.data.success)
            console.log("res.data", res.data)
            if (res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                });
            } else {
                console.log("elase error", res.data);
                toast.error(res.data.errorMsg);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal server error');
        }
    };

    return (
        <div>
            <Layout title={"Create Category - "} >
                <div className="container-flui m-4 p-3 dashboard">
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card w-100 m-3">
                                <div className="form-container" style={{ minHeight: "90vh" }}>
                                    <form className='m-3' onSubmit={handleUpdateSubmit}>
                                        <h4 className="title">Profile Update </h4>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder="Enter Your Name"
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
                                                disabled
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

                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Profile
