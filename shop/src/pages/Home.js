import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout.js'
// import { useAuthr } from '../context/auth.js'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BiSolidCartAdd } from 'react-icons/bi';
const Home = () => {
    // const [auth] = useAuthr();
    // console.log("auth-=============================", auth)

    const [product, setproduct] = useState([]);
    const [category, setCategory] = useState([]);
    const productData = async () => {
        const productRes = await axios.get(`${process.env.REACT_APP_API}/admin/products`)
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
    // category data resived
    const categoryData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/category`)
        if (categoryRes.data.success) {
            toast.success(categoryRes.data.message);
            setCategory(
                categoryRes.data.data,
            );;
        } else {
            toast.error(categoryRes.data.errorMsg);
        }

    }
    useEffect(() => {
        productData()
        categoryData()
    }, []);
    return (
        <Layout title={"Home - "}>

            <h1>Home Pages</h1>
            <div className="container-flui m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <p>search</p>
                        {/* <div key={`reverse-${type}`} className="mb-3"> */}
                        <div className="mb-3">
                            {category.map(() => (
                                <Form.Check
                                    inline={true}
                                    label="1"
                                    name="group1"
                                // id={`inline-${type}-1`}
                                />
                            ))}

                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card w-100 p-3">
                            <Row xs={1} md={3} className="g-4">
                                {product.map((item, idx) => (
                                    <Col key={item._id}>
                                        <Card>
                                            {/* <Link to={`/dashboard/admin/Product/${item._id}`} > */}
                                            <Card.Img variant="top" src={item.image} />
                                            {/* </Link> */}
                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text className='d-flex justify-content-around'>
                                                    <Button variant="outline-success">Success</Button>
                                                    <Button variant="outline-warning"> <BiSolidCartAdd /> Add To card</Button>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row >
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home

