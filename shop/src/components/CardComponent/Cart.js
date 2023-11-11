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

const Cart = ({ product }) => {
    const [cart, setCart] = useCart();
    const navigate = useNavigate()
    return (
        <>
            <Row xs={1} md={3} className="g-4">
                {product.map((item, idx) => (
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
                ))}
            </Row >
        </>
    )
}

export default Cart;
