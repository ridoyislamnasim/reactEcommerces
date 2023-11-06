import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout.js'
// import { useAuthr } from '../context/auth.js'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import axios from 'axios';
const Home = () => {
    // const [auth] = useAuthr();
    // console.log("auth-=============================", auth)

    const [product, setproduct] = useState([]);
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
    useEffect(() => {
        productData()
    }, []);
    return (
        <Layout title={"Home - "}>

            <h1>Home Pages</h1>
            <div className="container-flui m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <p>search</p>
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
                                                <Card.Text>

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

