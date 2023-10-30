import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Menu/UserMenu'


const UserDashboard = () => {
    return (
        <Layout title={"User Dashboard - "} >
            <div className="container-flui m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h1>Dashboard Pages</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard
