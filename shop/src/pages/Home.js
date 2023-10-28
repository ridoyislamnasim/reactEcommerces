import React from 'react'
import Layout from '../components/Layout/Layout.js'
// import { useAuth } from '../context/auth.js'
const Home = () => {
    // const [auth] = useAuth;
    return (
        <Layout title={"Home - "}>
            {/* {JSON.stringify(auth, null, 4)} */}
            <h1>Home Pages</h1>
        </Layout>
    )
}

export default Home

