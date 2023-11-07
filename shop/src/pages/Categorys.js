import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import useCatetory from '../components/Hooks/useCatetory'
import Layout from '../components/Layout/Layout'

const Categorys = () => {
    const params = useParams()
    const category = useCatetory()
    return (
        <Layout>
            <div>
                {category.map((item, idx) => (
                    <NavLink key={item._id}
                        to={`/Category/${item._id}`}
                        className="dropdown-item">
                        {item?.category}
                    </NavLink>
                )
                )}
            </div>
        </Layout>
    )
}

export default Categorys
