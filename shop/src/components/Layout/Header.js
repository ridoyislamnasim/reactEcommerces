import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { SiShopee } from 'react-icons/si'
import { MdShoppingCart } from 'react-icons/md'
import { useAuthr } from '../../context/auth'
import useCatetory from '../Hooks/useCatetory'
import { useCart } from '../../context/cart'
import { IoMdCart } from 'react-icons/io';
import { FaFacebookF, FaLinkedinIn, FaGithubAlt, FaPhoneAlt, } from 'react-icons/fa';
import { BiLogoGmail, BiMenu } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import '../../styles/HeaderStyle.css'
// import '../../styles/owl.carousel.min.css'
// ui
import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
const Header = () => {
    const [cart] = useCart();
    const [auth, setAuth] = useAuthr();
    const category = useCatetory()
    console.log("===========cart==", cart)
    const handelLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
    }
    return (
        <>
            <Navbar key={'md'} expand={'md'} className="bg-body-tertiary ">
                <Container fluid>
                    <Navbar.Brand className='ps-5'>
                        <NavLink to='/' className="nav-link" >
                            <SiShopee />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-md-${'md'}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-md-${'md'}`}
                        aria-labelledby={`offcanvasNavbarLabel-md-${'md'}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton >
                            {/* <Offcanvas.Title id={`offcanvasNavbarLabel-md-${'md'}`}>
                                Offcanvas
                            </Offcanvas.Title> */}
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-5">
                                <NavLink to='/' className="nav-link" >
                                    Home
                                </NavLink>
                                {/* category dropdown */}
                                <NavDropdown
                                    title="Category"
                                    id={`offcanvasNavbarDropdown-md-${'md'}`}
                                    className='cvate'
                                >
                                    {category.map((item, idx) => (
                                        // <NavDropdown.Item >
                                        <NavLink key={item._id}
                                            to={`/Category/${item._id}`}
                                            className="dropdown-item hhhhhh">
                                            {item?.category}
                                        </NavLink>
                                        // </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                                {/* category dropdownn end  */}
                                {/* auth wise option show  dropdown */}

                                {
                                    auth.user ?
                                        (<>
                                            <NavDropdown
                                                title={auth?.user?.name}
                                                id={`offcanvasNavbarDropdown-md-${'md'}`}
                                            >

                                                <NavLink
                                                    to={`/Dashboard/${auth?.user?.role === "admin" ? "Admin/CreateCategory" : "User/Orders"
                                                        }`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </NavLink>

                                                <NavLink
                                                    onClick={handelLogOut}
                                                    to="/login"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </NavDropdown>
                                        </>)
                                        :
                                        (<>
                                            <NavLink to='/register' className="nav-link" >
                                                Register
                                            </NavLink>
                                            <NavLink to='/login' className="nav-link" >
                                                Login
                                            </NavLink>
                                        </>
                                        )
                                }
                                {/* auth wise option show  dropdown   end */}

                                <NavLink to='/cart' className="nav-link" >
                                    <IconButton aria-label="cart">
                                        <Badge badgeContent={cart?.length} color="error">
                                            <MdShoppingCart />
                                            {/* <IoMdCart /> */}
                                        </Badge>
                                    </IconButton>
                                </NavLink>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>

    )
}

export default Header
