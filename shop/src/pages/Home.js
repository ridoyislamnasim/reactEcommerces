// ==========  ecternal import 
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout.js'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// ==========  internal import 
import Accordion from 'react-bootstrap/Accordion';
import { Price } from '../components/utility/Price.js';
import CardComponent from '../components/CardComponent/Card.js';
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
            console.log('title', productRes.data.data);
            setproduct(
                productRes.data.data,
            );
        } else {
            toast.error(productRes.data.errorMsg, {
                position: "top-left",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }

    }
    // ==========  
    const categoryData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/category`)
        if (categoryRes.data.success) {
            setCategory(
                categoryRes.data.data,
            );
        } else {
            toast.error(categoryRes.data.errorMsg, {
                position: "top-left",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
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
            setproduct(
                filterRes.data.data,
            );
        } else {
            toast.error('No Product Find', {
                position: "top-left",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
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
                            <Accordion defaultActiveKey="null" >
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
                            <Accordion defaultActiveKey="null">
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
                            <CardComponent product={product} columnNumber={3} />

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home

