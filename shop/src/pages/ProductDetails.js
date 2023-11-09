import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSolidCartAdd } from 'react-icons/bi';
import { FaReadme } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
// import { FaReadme } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';

const ProductDetails = () => {
    const [cart, setCart] = useCart();
    const [product, setproduct] = useState([]);
    const [similarProduct, setSimilarProduct] = useState([]);
    const navigate = useNavigate()
    const parems = useParams()

    // product get 

    // similar product get 
    // const similarProductData = async (parems, product) => {
    //     console.log('===================================similar product call')
    //     const productRes = await axios.get(`${process.env.REACT_APP_API}/shop/product/${parems.id}/${product.category._id}`)
    //     if (productRes.data.success) {
    //         toast.success(productRes.data.message);
    //         console.log('title', productRes.data.data);
    //         setSimilarProduct(
    //             productRes.data.data,
    //         );
    //     } else {
    //         toast.error(productRes.data.errorMsg);
    //     }
    // }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await axios.get(`${process.env.REACT_APP_API}/admin/product/${parems.id}`)
                if (productRes.data.success) {
                    toast.success(productRes.data.message);
                    console.log('title', productRes.data.data);
                    setproduct(
                        productRes.data.data,
                    );
                    const similarProductRes = await axios.get(`${process.env.REACT_APP_API}/shop/product/${parems.id}/${product.category._id}`)
                    if (similarProductRes.data.success) {
                        toast.success(similarProductRes.data.message);
                        console.log('title', similarProductRes.data.data);
                        setSimilarProduct(
                            similarProductRes.data.data,
                        );
                    } else {
                        toast.error(similarProductRes.data.errorMsg);
                    }
                } else {
                    toast.error(productRes.data.errorMsg);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [parems, product?.category?._id]);


    console.log('product', product);
    console.log('similarProduct===========================', similarProduct);
    return (
        <Layout title={"Product Detalis - "}>
            <>
                {/* <div className="col-md-12 p-3"> */}
                <Container>
                    {/* product ditalis */}
                    <Row className='pt-5 pb-3'>
                        <Card className='p-3' style={{ backgroundColor: '#f3f6f9' }}>
                            <Card className='mb-2'>
                                <Card.Body >Product Detalis</Card.Body>
                            </Card>
                            <Card className='d-flex w-100 flex-row p-2'>
                                {/* <Row> */}
                                <Col md={4}>
                                    {/* Content for the first column */}
                                    <div style={{}}>
                                        <Image src={product.image} style={{ maxHeight: '250px', maxWidth: '80%' }} rounded />
                                        {/* <Card.Img variant="top" src={product.image} style={{ maxHeight: '350px', }} /> */}
                                    </div>
                                </Col>
                                <Col md={8}>
                                    {/* Content for the second column */}
                                    <div className="col-md-11 d-flex justify-content-between align-items-center">
                                        <p><b>Name</b></p>
                                        <p><b>Category</b></p>
                                        <p><b>Price</b></p>

                                    </div>
                                    <hr />
                                    <div className="col-md-11 d-flex justify-content-between align-items-center">
                                        <p>{product?.name}</p>
                                        <p>{product?.category?.category}</p>
                                        <p>{product?.price}</p>
                                    </div>
                                    <hr />
                                    <div style={{ padding: '20px' }}>
                                        <div className='d-flex flex-column'>
                                            <p>description: {product?.description}</p>
                                        </div>
                                        <div className='d-flex justify-content-around'>
                                            <Button variant="outline-warning"
                                                onClick={() => {
                                                    setCart([...cart, product])
                                                    localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                    toast.success(`${product.name} Add into Cart`)
                                                }}
                                            >
                                                <BiSolidCartAdd /> Add To Card
                                            </Button>
                                        </div>

                                    </div>
                                </Col>
                                {/* </Row> */}
                            </Card>
                        </Card>
                    </Row>
                    {/* similar product show */}
                    <Row>
                        <div className="card w-100 p-3 mb-3" style={{ backgroundColor: '#f3f6f9' }}>
                            <Card className='mb-2'>
                                <Card.Body > Similar  Product</Card.Body>
                            </Card>
                            <Row xs={1} md={4} className="g-4">
                                {similarProduct?.length < 1 && <p className='text-center'>No Similar Product Found.</p>}
                                {similarProduct.map((item, idx) => (
                                    <Col key={item._id}>
                                        <Card>
                                            {/* <Link to={`/dashboard/admin/Product/${item._id}`} > */}
                                            <Card.Img variant="top" src={item.image} style={{ maxHeight: '250px', }} />
                                            {/* </Link> */}
                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text >
                                                    <div className='d-flex justify-content-around'>
                                                        <p>{item.price}</p>
                                                        <p>{item.category.category}</p>
                                                    </div>
                                                    <div className='d-flex justify-content-around'>
                                                        <Button variant="outline-success" onClick={() => navigate(`/product/details/${item._id}`)}><FaReadme /> Read </Button>
                                                        <Button variant="outline-warning"
                                                            onClick={() => {
                                                                setCart([...cart, product])
                                                                localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                                toast.success(`${product.name} Add into Cart`)
                                                            }}
                                                        >
                                                            <BiSolidCartAdd /> Add To Card
                                                        </Button>
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row >
                        </div>
                    </Row>
                </Container>
            </>
        </Layout >
    )
}

export default ProductDetails
