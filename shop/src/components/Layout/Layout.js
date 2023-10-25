import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({ children, title, description, keywords, author }) => {
    console.log('author={"Ridoy islam nasim"} ', title)
    return (
        <div>
            <Helmet>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}ecommerce app</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                <ToastContainer />
                <h1>{children}</h1>
            </main>
            <Footer />
        </div>
    )
}
Layout.defaultProps = {
    title: "",
    description: 'MERN stack project',
    keywords: 'MERN ,react. node, express, mongoDB',
    author: 'ridoy islam nasim'
}
export default Layout;

