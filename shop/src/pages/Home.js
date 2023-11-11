// ==========  ecternal import 
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout.js'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// ==========  internal import 
import Accordion from 'react-bootstrap/Accordion';
import { Price } from '../components/utility/Price.js';
import Cart from '../components/CardComponent/Cart.js';
import { toast } from 'react-toastify';
// 
const Home = () => {
    // ==========  state
    const [product, setproduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);

    // ==========  
    const handleRadioChange = (event) => {
        console.log('event', event);
        // console.log('event.target.id', event.target.id);
        setSelectedOption(event);
    };
    // ==========  
    const handelChange = (checke, id) => {
        let checkAll = [...selected]
        if (checke) {
            checkAll.push(id)
        } else {
            checkAll = checkAll.filter((e) => e !== id)
        }
        setSelected(checkAll)
        console.log(id, checke)
    }
    // ==========  
    const productData = async () => {
        const productRes = await axios.get(`${process.env.REACT_APP_API}/admin/products`)
        if (productRes.data.success) {
            // toast.success(productRes.data.message);
            console.log('title', productRes.data.data);
            setproduct(
                productRes.data.data,
            );
        } else {
            // toast.error(productRes.data.errorMsg);
        }

    }
    // ==========  
    const categoryData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/category`)
        if (categoryRes.data.success) {
            // toast.success(categoryRes.data.message);
            setCategory(
                categoryRes.data.data,
            );
        } else {
            // toast.error(categoryRes.data.errorMsg);
        }

    }
    // ==========  
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selected.length || selectedOption.length) {
                    await productFilter(selected, selectedOption)
                } else {
                    await productData();
                }
                await categoryData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selected, selectedOption]);
    // produch serach
    // ==========  
    const productFilter = async (selected, selectedOption) => {
        console.log('selected, selectedOption', selected, selectedOption);
        const filterRes = await axios.post(`${process.env.REACT_APP_API}/shop/filter`,
            {
                categoryArray: selected
                , priceRange: selectedOption
            })
        if (filterRes.data.success) {
            // toast.success(filterRes.data.message);
            setproduct(
                filterRes.data.data,
            );
        } else {
            toast.error('No Product Find');
        }

    }
    return (
        <Layout title={"Home - "}>
            <div className="container-flui m-3 p-3 dashboard">
                <div className="row">
                    {/* filter item */}
                    <div className="col-md-3">
                        <p>search</p>
                        {/* category */}
                        <>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Categories</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="mb-3">
                                            {category.map((item) => (
                                                <div key={item._id} className="mb-2">
                                                    <Form.Check
                                                        label={item.category}
                                                        name={item.category}
                                                        onChange={(e) => { handelChange(e.target.checked, item._id) }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                        </>
                        {/* price */}
                        <>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Price</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="mb-3">
                                            {Price.map((item) => (
                                                <div key={item.id} className="mb-2">
                                                    <Form.Check
                                                        type="radio"
                                                        name="group1"
                                                        label={item.name}
                                                        id={item.priceRange}
                                                        onChange={() => handleRadioChange(item.priceRange)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </>
                        <Button variant="outline-danger"
                            onClick={() => window.location.reload()}
                            className=" w-100 mt-3"
                        >
                            Reset
                        </Button>
                    </div>
                    {/* product info */}
                    <div className="col-md-9">
                        <div className="card w-100 p-3" style={{ backgroundColor: '#f3f6f9', minHeight: '80vh' }}>

                            {/* {product.map((item, idx) => (
                                    <Col key={item._id}>
                                        <Card>
                                            <Card.Img variant="top" src={item.image} style={{ maxHeight: '250px', }} />
                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text >
                                                    <div className='d-flex justify-content-around'>
                                                        <p>{item.price}</p>
                                                        <p>{item.category.category}</p>
                                                    </div>
                                                    <div className='d-flex justify-content-around'>
                                                        <Button variant="outline-success" onClick={() => navigate(`/product/details/${item._id}`)}><FaReadme /> Read </Button>
                                                        <Button variant="outline-warning" onClick={() => {
                                                            setCart([...cart, item])
                                                            localStorage.setItem('cart', JSON.stringify([...cart, item]))
                                                            toast.success(`${item.name} Add into Cart`)
                                                        }}> <BiSolidCartAdd /> Add To Card</Button>
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))} */}
                            {/*  */}
                            <Cart product={product} />

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home

