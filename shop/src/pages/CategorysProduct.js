import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import { FaReadme } from 'react-icons/fa';
import { BiSolidCartAdd } from 'react-icons/bi';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';
import useCatetory from '../components/Hooks/useCatetory';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useCart } from '../context/cart';

const CategorysProduct = () => {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const params = useParams();
    const category = useCatetory();
    const [value, setValue] = useState(0);
    const [categoryProduct, setCategoryProduct] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // ====== category wise product find
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
                    <Row xs={1} md={4} className="g-4">
                        {categoryProduct?.map((item) => (
                            <Col key={item._id}>
                                <Card>
                                    <Card.Img variant="top" src={item.image} style={{ maxHeight: '250px' }} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            <div className="d-flex justify-content-around">
                                                <p>{item.price}</p>
                                                <p>{item.category.category}</p>
                                            </div>
                                            <div className="d-flex justify-content-around">
                                                <Button variant="outline-success" onClick={() => navigate(`/product/details/${item._id}`)}>
                                                    <FaReadme /> Read
                                                </Button>
                                                <Button variant="outline-warning"
                                                    onClick={() => {
                                                        setCart([...cart, item])
                                                        localStorage.setItem('cart', JSON.stringify([...cart, item]))
                                                        toast.success(`${item.name} Add into Cart`)
                                                    }}
                                                >
                                                    <BiSolidCartAdd /> Add To Cart
                                                </Button>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </Layout >
    );
};

export default CategorysProduct;
