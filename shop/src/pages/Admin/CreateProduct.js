
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { toast } from 'react-toastify';


const CreateProduct = () => {
    // const [ SelectedItem, setSelectedItem] = useState(null);
    const [Category, setCategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState('Select Category');
    const categoryData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/category`)
        if (categoryRes.data.success) {
            toast.success(categoryRes.data.message);
            console.log('title', categoryRes.data.data);
            setCategory(
                categoryRes.data.data,
            );
        } else {
            toast.error(categoryRes.data.errorMsg);
        }

    }
    useEffect(() => {
        categoryData()
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    return (
        <div>
            <Layout title={"Create Product - "} >
                <div className="container-flui m-3 p-3 dashboard">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card w-100 p-3">
                                <h1>Create Product Pages</h1>

                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 d-flex justify-content-between align-items-center">
                                        {selectedItem}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="w-100">

                                        {Category?.map((item, index) => (
                                            <Dropdown.Item key={item._id} onClick={() => handleItemClick(item.category)} >{item.category}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default CreateProduct