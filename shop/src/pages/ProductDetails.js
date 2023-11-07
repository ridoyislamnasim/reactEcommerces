import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSolidCartAdd } from 'react-icons/bi';
// import { FaReadme } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const ProductDetails = () => {
    const [product, setproduct] = useState([]);
    const navigate = useNavigate()
    const parems = useParams()

    // product get 
    const productData = async (parems) => {
        const productRes = await axios.get(`${process.env.REACT_APP_API}/admin/product/${parems.id}`)
        if (productRes.data.success) {
            toast.success(productRes.data.message);
            console.log('title', productRes.data.data);
            setproduct(
                productRes.data.data,
            );
        } else {
            toast.error(productRes.data.errorMsg);
        }

    }
    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         await productData(parems)
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //     }
        // };

        // fetchData();
        productData(parems)
    }, [parems]);
    console.log('product', product);
    return (
        <Layout title={"Product Detalis - "}>
            <>
                {/* <div className="col-md-12 p-3"> */}
                <Container>
                    <Row className='pt-5 pb-3'>
                        <Card className='mb-2'>
                            <Card.Body >Product Detalis</Card.Body>
                        </Card>
                        <Card className='d-flex flex-row p-2'>
                            <Col md={6}>
                                {/* Content for the first column */}
                                <div style={{}}>
                                    <Card.Img variant="top" src={product.image} style={{ maxHeight: '350px', }} />
                                </div>
                            </Col>
                            <Col md={6}>
                                {/* Content for the second column */}
                                <div style={{ padding: '20px' }}>
                                    <div className='d-flex flex-column'>
                                        <p>Name : {product?.name}</p>
                                        <p>Price : {product?.price}</p>
                                        <p>Category: {product?.category?.category}</p>
                                        <p>description: {product?.description}</p>
                                    </div>
                                    <div className='d-flex justify-content-around'>
                                        <Button variant="outline-warning"> <BiSolidCartAdd /> Add To Card</Button>
                                    </div>

                                </div>
                            </Col>
                        </Card>
                    </Row>
                    <Row>
                        <Card className='mb-2'>
                            <Card.Body > Similar  Product</Card.Body>
                        </Card>
                    </Row>
                </Container>
            </>
        </Layout>
    )
}

export default ProductDetails
