//  ========== external
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";


//  ========== internal
import AdminMenu from "../../components/Menu/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuthr } from "../../context/auth";

const Orders = () => {
    // ========= State
    const [status,] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
    ]);
    const [orders, setOrders] = useState([]);
    const [auth] = useAuthr();
    // ======== get all order information
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/shop/all-order`);
            setOrders(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    // ======== update order status
    const handleChange = async (orderId, value) => {
        try {
            await axios.put(`${process.env.REACT_APP_API}/shop/update-order-status/${orderId}`, {
                status: value,
            });
            toast.success("Updated")
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"All Orders Data"}>
            <div className="container-flui m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3 ">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 p-3 ">
                        <Card className="p-3" style={{ backgroundColor: '#f3f6f9', minHeight: '80vh' }}>
                            <h1 className="text-center">All Orders</h1>
                            {orders?.map((order, i) => {
                                return (
                                    <div className="border shadow">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">{i}</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col"> date</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <Form.Select value={order?.status} onChange={(e) => handleChange(order?._id, e.target.value)} aria-label="Floating label select example">
                                                            {status?.map((item, index) => (
                                                                <option key={index} value={item} >{item}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </td>
                                                    <td>{order?.buyer?.name}</td>
                                                    <td>{moment(order?.createAt).fromNow()}</td>
                                                    <td>{order?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{order?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {order?.products?.map((p, i) => (
                                                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                    <div className="col-md-4">
                                                        <img
                                                            src={`/api/v1/product/product-photo/${p._id}`}
                                                            className="card-img-top"
                                                            alt={p.name}
                                                            width="100px"
                                                            height={"100px"}
                                                        />
                                                        dvfd                                     </div>
                                                    <div className="col-md-8">
                                                        <p>{p.name}</p>
                                                        <p>{p.description.substring(0, 30)}</p>
                                                        <p>Price : {p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
