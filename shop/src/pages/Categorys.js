import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import useCatetory from '../components/Hooks/useCatetory'
import Layout from '../components/Layout/Layout'
import { Tab, Tabs } from '@mui/material'

const Categorys = () => {
    const params = useParams()
    const category = useCatetory()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Layout>
            <div className='p-5'>
                {/* {category.map((item, idx) => (
                    <NavLink key={item._id}
                        to={`/Category/${item._id}`}
                        className="dropdown-item">
                        <Tab label={item?.category} />
                    </NavLink>
                )
                )} */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs "
                    centered
                >
                    {category.map((item, idx) => (
                        <NavLink key={item._id}
                            to={`/Category/${item._id}`}
                        >

                            <Tab label={item?.category} />
                        </NavLink>
                    )
                    )}

                </Tabs>
            </div>
        </Layout>
    )
}

export default Categorys
