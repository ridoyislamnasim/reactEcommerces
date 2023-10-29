import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'
import { useAuthr } from "../../context/auth";

const AdminDashboard = () => {
    const [auth] = useAuthr()
    return (
        <Layout title={"User Dashboard - "} >

            <div className="container-flui m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>{auth?.user?.name}</h3>
                            <h3>{auth?.user?.email}</h3>
                            <h3>{auth?.user?.address}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard