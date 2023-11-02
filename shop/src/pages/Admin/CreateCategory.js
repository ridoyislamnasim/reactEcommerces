import React, { useEffect } from 'react'
// import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'
import axios from 'axios';


const CreateCategory = () => {
    const [Category, setCategory] = useState();
    useEffect(
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/auth/login`)
    if (categoryRes.data.success) {
        toast.success(res.data.message);
        setCategory({
            token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // navigate(location.state || "/");
        navigate(Location.state || "/");
    } else {
        toast.error(res.data.errorMsg);
    }
    )
return (
    <div>
        <Layout title={"Create Category - "} >
            <div className="container-flui m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h1>Create Category Pages</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
)
}

export default CreateCategory
