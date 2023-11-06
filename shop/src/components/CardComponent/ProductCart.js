import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const ProductCart = ({ product }) => {
    // const ln =
    return (
        <>
            <Row xs={1} md={3} className="g-4">
                {product.map((item, idx) => (
                    <Col key={item._id}>
                        <Card>
                            {/* src={item.imageUrl} dashboard/admin/Products/ */}
                            <Link to={`/dashboard/admin/Product/${item._id}`} >
                                <Card.Img variant="top" src={item.image} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row >
        </>
    )
}

export default ProductCart
