import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { BiSolidCartAdd } from 'react-icons/bi';
import { FaReadme } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCart } from '../../context/cart';

const CardComponent = ({ product, columnNumber }) => {
    const [cart, setCart] = useCart();
    const navigate = useNavigate()
    return (
        <>
            <Row xs={1} md={columnNumber} className="g-4">
                {product.map((item, idx) => (
                    <Col key={item._id}>
                        <Card className='custom-hover-div'>
                            <Card.Img variant="top" src={item.image} style={{ maxHeight: '250px', }} />
                            <Card.Body>
                                <Card.Title className='d-flex justify-content-around'>{item.name}</Card.Title>
                                <Card.Text >
                                    <div className='d-flex justify-content-around pb-2'>
                                        <p>{item.category.category}</p>
                                        <p style={{ marginTop: '-3px' }}>
                                            <span style={{ fontSize: '20px' }} >৳ </span>{
                                                new Intl.NumberFormat('en-BD', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }).format(item.price)
                                            }/-
                                        </p>

                                    </div>
                                    <div className='d-flex justify-content-around '>
                                        <Button variant="outline-success" onClick={() => navigate(`/product/details/${item._id}`)} className='me-3'>
                                            <FaReadme /> Read
                                        </Button>
                                        <Button variant="outline-warning" onClick={() => {
                                            setCart([...cart, item])
                                            localStorage.setItem('cart', JSON.stringify([...cart, item]))
                                            toast.success(`${item.name} Add into Cart`, {
                                                position: "top-left",
                                                autoClose: 500,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                draggable: true,
                                            })
                                        }}> <BiSolidCartAdd /> Add Card</Button>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row >
        </>
    )
}

export default CardComponent;
