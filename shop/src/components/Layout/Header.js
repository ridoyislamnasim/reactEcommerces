import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { SiShopee } from 'react-icons/si'
import { useAuthr } from '../../context/auth'
const Header = () => {
    const [auth, setAuth] = useAuthr();
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

                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link" >
                                    Cart (0)
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
