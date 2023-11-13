import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {
    return (
        <div className='footer d-flex flex-column align-items-center'>
            <h6 className='text-center d-flex justify-content-center align-items-center ' >All Right Reserved &copy;<div><NavLink to='https://ridoyislamnasim.up.railway.app/'><span style={{ color: '#ff0000' }}>ridoyislamnasim</span></NavLink></div>  </h6>
            <div className='text-center d-flex align-items-center mt-3'>
                <div><NavLink to='/'>Home</NavLink></div>|
                <div><NavLink to='/contact'>Contact</NavLink></div>  |

            </div>
        </div>
    )
}

export default Footer
