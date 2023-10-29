import React from 'react'
import Layout from '../components/Layout/Layout.js'
import { useAuthr } from '../context/auth.js'
const Home = () => {
    const [auth] = useAuthr();
    // console.log("auth-=============================", auth)
    return (
        <Layout title={"Home - "}>

            <h1>Home Pages</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    )
}

export default Home

