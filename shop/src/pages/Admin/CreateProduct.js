
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductForm from '../../components/Form/ProductForm';


const CreateProduct = () => {
    // const [ SelectedItem, setSelectedItem] = useState(null);
    const [Category, setCategory] = useState(null);
    const [CategoryId, setCategoryId] = useState(null);
    const [selectedItem, setSelectedItem] = useState('Select Category');
    const [name, setname] = useState(null);
    const [price, setprice] = useState(null);
    const [quantity, setquantity] = useState(null);
    const [shipping, setshipping] = useState('Select shipping');
    const [description, setdescription] = useState(null);
    const [image, setimage] = useState(null);
    const categoryData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/category`)
        if (categoryRes.data.success) {
            // toast.success(categoryRes.data.message);
            console.log('title', categoryRes.data.data);
            setCategory(
                categoryRes.data.data,
            );
        } else {
            // toast.error(categoryRes.data.errorMsg);
        }

    }
    useEffect(() => {
        categoryData()
    }, []);

    const handleItemClick = (item) => {
        setCategory(item);
    };

    //  create product
    const handleProductSubmit = async (event) => {
        event.preventDefault()
        if (!CategoryId) {
            toast.warn('Please select a category.'); // Set error message if category is not selected
            return;
        }
        try {
            const formData = new FormData()
            formData.append("category", CategoryId);
            formData.append("name", name);
            formData.append("price", price);
            formData.append("quantity", quantity);
            formData.append("shipping", shipping);
            formData.append("description", description);
            formData.append("image", image);
            console.log(image)
            const data = await axios.post(`${process.env.REACT_APP_API}/admin/create-product`, formData);
            if (data?.data.success) {
                console.log('data', data.data);
                toast.success(data.data.message);
            } else {
                toast.error(data.data.errorMsg);
                console.log('fail');
            };
        } catch (error) {
            console.log(error);
        };
    };
    const parentProps = {
        Category, name, setname, price, setprice, quantity, setquantity, shipping, setshipping,
        description, setdescription, image, setimage, selectedItem, setSelectedItem, setCategoryId, handleItemClick, handleProductSubmit
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
                            <div className="card w-100 p-3" style={{ backgroundColor: '#f3f6f9', minHeight: '80vh' }}>
                                <Card body className="mb-3"><h4 className="text-center">Create Product</h4></Card>
                                <ProductForm {...parentProps} />

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default CreateProduct