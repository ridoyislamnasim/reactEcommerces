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
                        <Link to={`/dashboard/admin/Product/${item._id}`} className="text-decoration-none text-reset">
                            <Card>
                                {/* src={item.imageUrl} dashboard/admin/Products/ */}

                                <Card.Img variant="top" src={item.image} style={{ maxHeight: '250px' }} />

                                <Card.Body>
                                    <Card.Title>{item.name} </Card.Title>
                                    <Card.Text>
                                        <p>
                                            <span style={{ fontSize: '20px' }} >৳ </span>{
                                                new Intl.NumberFormat('en-BD', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }).format(item.price)
                                            }/-
                                        </p>
                                        <p>{item.category.category}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row >
        </>
    )
}

export default ProductCart
