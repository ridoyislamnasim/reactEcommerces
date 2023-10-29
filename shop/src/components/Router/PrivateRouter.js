import { useState, useEffect } from "react";
import { useAuthr } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import React from 'react'
import Spinner from "../Spinner";

const PrivateRouter = () => {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [auth, setAuth] = useAuthr();
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('http://localhost:2000/auth/login', {
                headers: {
                    "Authorization": auth?.token
                }
            })
            if (res.data.isAuthenticated) {
                setisAuthenticated(true)
            } else {
                setisAuthenticated(false)
            }
        }

        if (auth?.token) {
            authCheck()
        }
    }, [auth?.token])
    return (
        isAuthenticated ? <Outlet /> : <Spinner />
    )
}

export default PrivateRouter
