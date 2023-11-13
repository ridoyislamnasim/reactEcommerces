//  ===========   external
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
//  ===========  internal  
import CategoryForm from '../../components/Form/CategoryForm';
import CategoryEditModel from '../../components/ModelFile/CategoryEditModel';
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'


const CreateCategory = () => {
    //  ===========  State
    const [Category, setCategory] = useState(null);
    const [categoryName, setcategoryName] = useState();
    const [show, setShow] = useState(false);
    const [selected, setselected] = useState([]);
    const [categoryChange, setcategoryChange] = useState(null);

    //  ===========  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ===========  create category
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = await axios.post(`${process.env.REACT_APP_API}/admin/create-category`, {
                category: categoryName
            });
            if (data?.data.success) {
                console.log('data', data.data);
                toast.success(data.data.message, {
                    position: "top-left",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                }
                );
                categoryData();
            } else {
                toast.error("data.data.errorMsg", {
                    position: "top-left",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                }
                );
                console.log('fail');
            };
        } catch (error) {
            console.log(error);
        };
    };
    // ========== find All category 
    const categoryData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/category`)
        if (categoryRes.data.success) {
            setCategory(
                categoryRes.data.data,
            );
        } else {
            toast.error(categoryRes.data.errorMsg, {
                position: "top-left",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            }
            );
        }

    }
    useEffect(() => {
        categoryData()
    }, []);
    // ========== update category product
    const handleEdit = async (event) => {
        event.preventDefault()
        try {
            console.log('categoryChange', categoryChange);
            const data = await axios.put(`${process.env.REACT_APP_API}/admin/update-category/${selected._id}`, {
                category: categoryChange
            });
            if (data?.data.success) {
                console.log('data', data.data);
                toast.success(data.data.message, {
                    position: "top-left",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                }
                );
                categoryData();
                handleClose()
            } else {
                toast.error(data.data.errorMsg, {
                    position: "top-left",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                }
                );
                console.log('fail');
            };
        } catch (error) {
            console.log(error);
        };
    };
    // ========== delete category 
    const handleDelete = async (event) => {
        try {
            console.log('categoryChange', categoryChange);
            const data = await axios.delete(`${process.env.REACT_APP_API}/admin/delete-category/${event}`);
            if (data?.data.success) {
                console.log('data', data.data);
                console.log('data', data.data.data.category);
                toast.success(`${data.data.data.category} ${data.data.message}`, {
                    position: "top-left",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                }
                );
                setCategory([]);
                categoryData();
            } else {
                toast.error(data.data.errorMsg, {
                    position: "top-left",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                }
                );
                console.log('fail');
            };
        } catch (error) {
            console.log(error);
        };
    };


    return (
        <div>
            <Layout title={"Create Category - "} >
                <div className="container-flui m-3 p-3 dashboard">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9" >
                            <div className="card w-100 p-3" style={{ backgroundColor: '#f3f6f9', minHeight: '80vh' }}>
                                <>
                                    <h4 className="text-center">Create Category </h4>
                                    <hr />
                                    <CategoryForm handleSubmit={handleSubmit} value={categoryName} setValue={setcategoryName} />
                                    <h4 className="text-center">Our Category </h4>
                                    <hr />
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
