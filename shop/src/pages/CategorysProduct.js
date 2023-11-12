// ========== 
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Tab } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';
import useCatetory from '../components/Hooks/useCatetory';
import Nav from 'react-bootstrap/Nav';
// ========== 

import Cart from '../components/CardComponent/Card';

const CategorysProduct = () => {
    // ========== 

    const params = useParams();
    const category = useCatetory();
    const [categoryProduct, setCategoryProduct] = useState([]);

    // ========== category wise product find
    const categoryProductData = async (params) => {
        try {
            const categoryRes = await axios.get(`${process.env.REACT_APP_API}/shop/product/${params.id}`);
            if (categoryRes.data.success) {
                toast.success(categoryRes.data.message);
                toast.success("categoryRes.data.message");
                setCategoryProduct(categoryRes.data.data);
            } else {
                toast.error(categoryRes.data.errorMsg);
            }
        } catch (error) {
            console.error('Error fetching category products:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await categoryProductData(params);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params]);

    return (
        <Layout>
            <div className="p-5">
                {/* <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs"
                    centered
                >
                    {category.map((item) => (
                        <NavLink key={item._id} to={`/Category/${item._id}`}>
                            <Tab label={item?.category} />
                        </NavLink>
                    ))}
                </Tabs> */}
                <Nav variant="tabs" defaultActiveKey="/home">
                    {category.map((item) => (
                        <Nav.Item>
                            <NavLink key={item._id} to={`/Category/${item._id}`} style={{ paddingBottom: "10px" }}>
                                <Tab label={item?.category} eventKey={item?.category} ></Tab>
                            </NavLink>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
            <div className="">
                <div className="card w-100 p-5" style={{ backgroundColor: '#f3f6f9' }}>
                    {/* cart show  */}
                    <Cart product={categoryProduct} columnNumber={4} />
                </div>
            </div>
        </Layout >
    );
};

export default CategorysProduct;
