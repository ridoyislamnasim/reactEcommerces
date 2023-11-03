import React, { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import CategoryForm from '../../components/Form/CategoryForm';
import CategoryEditModel from '../../components/ModelFile/CategoryEditModel';



const CreateCategory = () => {
    const [Category, setCategory] = useState(null);
    const [categoryName, setcategoryName] = useState();
    const [show, setShow] = useState(false);
    const [selected, setselected] = useState([]);
    const [categoryChange, setcategoryChange] = useState(null);

    // const handelCelected = (item) => setselected()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const categoryData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/category`)
        if (categoryRes.data.success) {
            toast.success(categoryRes.data.message);
            setCategory(
                categoryRes.data.data,
            );;
        } else {
            toast.error(categoryRes.data.errorMsg);
        }

    }
    useEffect(() => {
        categoryData()
    }, []);
    const handleDelete = async (event) => {
        try {
            console.log('categoryChange', categoryChange);
            const data = await axios.delete(`${process.env.REACT_APP_API}/admin/delete-category/${event}`);
            if (data?.data.success) {
                console.log('data', data.data);
                console.log('data', data.data.data.category);
                toast.success(`${data.data.data.category} ${data.data.message}`);
                categoryData();
            } else {
                toast.error(data.data.errorMsg);
                console.log('fail');
            };
        } catch (error) {
            console.log(error);
        };
    };
    // edit product
    const handleEdit = async (event) => {
        event.preventDefault()
        try {
            console.log('categoryChange', categoryChange);
            const data = await axios.put(`${process.env.REACT_APP_API}/admin/update-category/${selected._id}`, {
                category: categoryChange
            });
            if (data?.data.success) {
                console.log('data', data.data);
                toast.success(data.data.message);
                categoryData();
                handleClose()
            } else {
                toast.error(data.data.errorMsg);
                console.log('fail');
            };
        } catch (error) {
            console.log(error);
        };
    };
    //  create product
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = await axios.post(`${process.env.REACT_APP_API}/admin/create-category`, {
                category: categoryName
            });
            if (data?.data.success) {
                console.log('data', data.data);
                toast.success(data.data.message);
                categoryData();
            } else {
                toast.error(data.data.errorMsg);
                console.log('fail');
            };
        } catch (error) {
            console.log(error);
        };
    };
    console.log(Category)
    return (
        <div>
            <Layout title={"Create Category - "} >
                <div className="container-flui m-3 p-3 dashboard">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card w-100 p-3">
                                <>
                                    <CategoryForm handleSubmit={handleSubmit} value={categoryName} setValue={setcategoryName} />
                                    <h1>Create Category Pages</h1>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>No:</th>
                                                <th>Category</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {Category?.map((item, index) => (
                                                <tr key={item._id}>

                                                    <td>{index + 1}</td>
                                                    <td>{item.category}</td>
                                                    <td>

                                                        <Button variant="outline-success" onClick={() => { handleShow(); setselected(item); setcategoryChange(item.category) }}>Edit </Button>{' '}
                                                        <Button variant="outline-danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <CategoryEditModel handleClose={handleClose} handleEdit={handleEdit} show={show} categoryChange={categoryChange} setcategoryChange={setcategoryChange} />
                                </>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default CreateCategory
