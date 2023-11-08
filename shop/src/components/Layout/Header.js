import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { SiShopee } from 'react-icons/si'
import { useAuthr } from '../../context/auth'
import useCatetory from '../Hooks/useCatetory'
import { useCart } from '../../context/cart'
import { IoMdCart } from 'react-icons/io';
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to='/' className="navbar-brand" ><SiShopee /></Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" >
                                    Home
                                </NavLink>
                            </li>
                            {/* category  */}
                            <li className="nav-item dropdown">
                                <NavLink
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    style={{ border: "none" }}
                                >
                                    Category
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li>
                                        {category.map((item, idx) => (
                                            <NavLink key={item._id}
                                                to={`/Category/${item._id}`}
                                                className="dropdown-item">
                                                {item?.category}
                                            </NavLink>
                                        )
                                        )}

                                    </li>
                                </ul>
                            </li>
                            {/* login registation */}
                            {
                                auth.user ?
                                    (<>
                                        <li className="nav-item dropdown">
                                            <NavLink
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                style={{ border: "none" }}
                                            >
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink
                                                        to={`/Dashboard/${auth?.user?.role === "admin" ? "admin" : "user"
                                                            }`}
                                                        className="dropdown-item"
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        onClick={handelLogOut}
                                                        to="/login"
                                                        className="dropdown-item"
                                                    >
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    </>)
                                    :
                                    (<>
                                        <li className="nav-item">
                                            <NavLink to='/register' className="nav-link" >
                                                Register
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to='/login' className="nav-link" >
                                                Login
                                            </NavLink>
                                        </li>
                                    </>
                                    )
                            }
                            {/* cart */}
                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link" >
                                    <IconButton aria-label="cart">
                                        <Badge badgeContent={cart?.length} color="error">
                                            {/* <ShoppingCartIcon /> */}
                                            <IoMdCart />
                                        </Badge>
                                    </IconButton>
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
