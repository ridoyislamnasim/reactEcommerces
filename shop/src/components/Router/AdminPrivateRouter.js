import { useState, useEffect } from "react";
import { useAuthr } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react'
import Spinner from "../Spinner";

const AdminAdminPrivateRouter = () => {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [auth,] = useAuthr();
    const navigate = useNavigate()
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('http://localhost:2000/auth/auth', {
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
        if (auth?.user?.role === 'admin') {
            if (auth?.token) {
                authCheck()
            }
        } else if (auth?.user?.role === 'user') {
            navigate('/')
        } else {
            // go to login page 
        }

    }, [auth, navigate])
    return (
        isAuthenticated ? <Outlet /> : <Spinner path="" />
    )
}

export default AdminAdminPrivateRouter
