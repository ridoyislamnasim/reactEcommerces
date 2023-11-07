
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'
import ProductCart from '../../components/CardComponent/ProductCart.js'
import axios from 'axios'
import { toast } from 'react-toastify'

const Products = () => {
    const [product, setproduct] = useState([]);
    const productData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/products`)
        if (categoryRes.data.success) {
            toast.success(categoryRes.data.message);
            console.log('title', categoryRes.data.data);
            setproduct(
                categoryRes.data.data,
            );
        } else {
            toast.error(categoryRes.data.errorMsg);
        }

    }
    useEffect(() => {
        productData()
    }, []);
    return (
        <div>
            <Layout title={"Products - "} >
                <div className="container-flui m-3 p-3 dashboard">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card w-100 p-3">
                                <h1>Products Pages</h1>
                                <ProductCart product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Products