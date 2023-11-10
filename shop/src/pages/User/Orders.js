import React, { useState, useEffect, } from "react";
import UserMenu from "../../components/Menu/UserMenu";
import Layout from "./../../components/Layout/Layout";
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useAuthr } from "../../context/auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";

const Orders = () => {
    const [cart] = useCart()
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [auth,] = useAuthr();
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/shop/order`);
            console.log('data.data', data.data);
            setOrders(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    console.log('orders', orders);
    return (
        <Layout title={"Your Orders"}>
            <div className="container-flui p-3 m-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Orders</h1>
                        <Accordion defaultActiveKey={['0']} flush>
                            {orders.length <= 0 ?
                                <>
                                    <Card style={{ width: '18rem' }} className='w-100   p-2'>
                                        {cart.length <= 0 ?
                                            (
                                                <div className='d-flex w-100' style={{ minHeight: '50vh' }}>
                                                    <div class="d-flex w-100  justify-content-around align-items-center"  >
                                                        <button type="button" class="btn btn-outline-success" onClick={() => navigate('/')}>Go Shopping</button>
                                                    </div>
                                                </div>
                                            ) :
                                            (
                                                <div className='d-flex w-100' style={{ minHeight: '50vh' }}>
                                                    <div class="d-flex w-100 flex-column  justify-content-around align-items-center"  >
                                                        <h3><b>{cart.length} </b>products added to cart. Please checkout...</h3>
                                                        <p>Would you like to proceed with checkout now, or would you like to continue shopping and add more items to your cart?</p>
                                                        <div class="d-flex w-100  justify-content-around align-items-center"  >
                                                            <button type="button" class="btn btn-outline-success" onClick={() => navigate('/cart')}>Go Cart</button>
                                                            <button type="button" class="btn btn-outline-success" onClick={() => navigate('/')}>Go Shopping</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Card>
                                </>
                                :
                                <>
                                    {orders?.map((order, i) => {
                                        return (
                                            <div className="border shadow">
                                                <table className="table mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Buyer</th>
                                                            <th scope="col"> date</th>
                                                            <th scope="col">Payment</th>
                                                            <th scope="col">Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{order?.status}</td>
                                                            <td>{order?.buyer?.name}</td>
                                                            <td>{moment(order?.createAt).fromNow()}</td>
                                                            <td>{order?.payment.success ? "Success" : "Failed"}</td>
                                                            <td>{order?.products?.length}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="container">
                                                    <Accordion.Item eventKey={i}>
                                                        <Accordion.Header>Products Details</Accordion.Header>
                                                        <Accordion.Body>
                                                            {order?.products?.map((p, i) => (
                                                                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                                                        {/* <Col xs={6} md={4}> */}
                                                                        <Image style={{ height: "100px", width: "100px" }} src={p.image} rounded />
                                                                        {/* </Col> */}

                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <div className="col-md-11 d-flex justify-content-between align-items-center">
                                                                            <p><b>Name</b></p>
                                                                            <p><b>Description</b></p>
                                                                            <p><b>Price</b></p>
                                                                        </div>
                                                                        <div className="col-md-11 d-flex justify-content-between align-items-center">
                                                                            <p>{p.name}</p>
                                                                            <p>{p.description.substring(0, 30)}</p>
                                                                            <p>{p.price}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>}
                        </Accordion>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
