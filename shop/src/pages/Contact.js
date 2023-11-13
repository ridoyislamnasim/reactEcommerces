import React from 'react'
// import Layout from '../components/layout/Layout' 
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FcLink } from "react-icons/fc";
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom'
const Contact = () => {
    return (
        <Layout title={"Contact - "}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/contact.jpg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        any query and info about prodduct feel free to call anytime we 24X7
                        vaialible
                    </p>
                    <p className="mt-3">
                        <BiMailSend /> : ridoyislamnasim@gmail.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : 01575229442
                    </p>
                    <p className="mt-3 d-flex">
                        <FcLink />  :  <Link to='https://ridoyislamnasim.up.railway.app/'>  www.ridoyislamnasim.com</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Contact

