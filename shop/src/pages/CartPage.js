import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart'
import Layout from '../components/Layout/Layout'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { toast } from 'react-toastify';
import { useAuthr } from '../context/auth';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth] = useAuthr()
    const navigate = useNavigate();
    // total price 
    const [totalPrice, setTotalPrice] = useState("$0.00");

    useEffect(() => {
        const calculateTotalPrice = async () => {
            let price = 0;
            if (cart) {
                price = cart.reduce((total, item) => total + item.price, 0);
            }
            const formattedPrice = price.toLocaleString('en-BD', {
                style: 'currency',
                currency: 'BDT'
            });
            setTotalPrice(formattedPrice);
        };

        calculateTotalPrice();
    }, [cart]);

    const removeCart = async (removeId) => {
        try {
            const myCart = [...cart]
            const index = myCart.findIndex((item) => item._id === removeId)
            myCart.splice(index, 1);
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
            toast.success("Remove Successfully");
        } catch (error) {
            console.log('error', error)
        }

    }
    return (
        <Layout>
            <>
                <Container>
                    <Row>

                        <Card className='mt-3 mb-3 justify-content-around align-items-start  d-flex  flex-row'>
                            {/* product  */}
                            {/* <div className='col-6 p-1'> */}
                            <Col xs={7} className="d-flex  flex-column  justify-content-around align-items-start">
                                <div className='p-2 '>Shopping Bag</div>
                                {cart.map((item, idx) => (
                                    <Col key={item._id} className=' w-100'>
                                        <Card className='d-flex flex-row m-3 p-2'>
                                            {/* <Card.Img variant="top"  /> */}
                                            <Image src={item.image} style={{ maxHeight: '150px', maxWidth: '200px' }} rounded />
                                            <Card.Body>
                                                <Card.Text>
                                                    <div className=' '>
                                                        <p className='mb-0'>name : {item.name}</p>
                                                        <p className='mb-0'>Price : {item.price}</p>
                                                        {/* <p>category : {item.price}</p> */}
                                                        <p className='mb-0'>category : {item.category.category}</p>
                                                    </div>
                                                </Card.Text>
                                                <Button variant="danger" onClick={() => removeCart(item._id)}>
                                                    Remove
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Col>
                            {/* checkout Payment */}
                            {/* <div className='col-5 d-flex justify-content-space-around align-items-start'> */}
                            <Col xs={5} className="d-flex justify-content-around align-items-start">
                                <div className='w-100'>
                                    <div className='p-2 mb-3'>Order Summary </div>
                                    <Card style={{ width: '18rem' }} className='w-100   p-2'>

                                        <Card.Body>
                                            <Card.Text>
                                                <div className='d-flex   justify-content-between align-items-start '>
                                                    <p className='mb-0'>Subtotal ({cart?.length} item) </p>
                                                    <p className='mb-0'>{totalPrice} TK</p>
                                                </div>
                                                <div className='d-flex   justify-content-between align-items-start '>
                                                    <p className='mb-0'>Delivery  </p>
                                                    <p className='mb-0'>BDT 00.00 TK</p>
                                                </div>
                                                <div className='d-flex   justify-content-between align-items-start '>
                                                    <p className='mb-0'>Estimated Tax  </p>
                                                    <p className='mb-0'> BDT 00.00 TK</p>
                                                </div>
                                                <hr />
                                                <div className='d-flex   justify-content-between align-items-start '>
                                                    <p className='mb-0'><b>total Balance  </b></p>
                                                    <p className='mb-0'> <b>{totalPrice} TK</b></p>
                                                </div>

                                            </Card.Text>

                                        </Card.Body>
                                        {auth?.user ? (
                                            <>
                                                <div className='d-flex  justify-content-around   '>
                                                    <Button variant="outline-success" > Check Out </Button>
                                                    <Button variant="warning" >Payment</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className=''>
                                                    <Button variant="info" onClick={() => navigate('/login', { state: '/cart' })}>Log In</Button>
                                                </div>
                                            </>
                                        )}
                                    </Card>

                                </div>
                            </Col>
                        </Card>
                    </Row>
                </Container>

            </>
        </Layout >

    )
}

export default CartPage
