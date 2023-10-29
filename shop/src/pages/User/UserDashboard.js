import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Menu/UserMenu'


const UserDashboard = () => {
    return (
        <Layout title={"User Dashboard - "} >
            <h1>User Dashboard page</h1>
            <UserMenu />
        </Layout>
    )
}

export default UserDashboard
