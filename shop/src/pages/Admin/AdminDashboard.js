import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'


const AdminDashboard = () => {
    return (
        <Layout title={"User Dashboard - "} >
            <h1>Admin Dashboard page</h1>
            <AdminMenu />
        </Layout>
    )
}

export default AdminDashboard