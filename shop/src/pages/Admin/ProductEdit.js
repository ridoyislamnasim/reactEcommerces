
import React, { useEffect, useState } from 'react'
// import React from 'react';
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Menu/AdminMenu'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { toast } from 'react-toastify';
// import ProductForm from '../../components/Form/ProductForm';
import { useNavigate, useParams } from 'react-router-dom'
import ProductEditForm from '../../components/Form/ProductEditForm';

const ProductEdit = () => {
    // const [ SelectedItem, setSelectedItem] = useState(null);
    const param = useParams()
    const navigate = useNavigate();
    const [Category, setCategory] = useState([]);
    const [category, setcategory] = useState('hk');
    const [CategoryId, setCategoryId] = useState(null);
    const [selectedItem, setSelectedItem] = useState('Select Category');
    const [name, setname] = useState(null);
    const [price, setprice] = useState(null);
    const [quantity, setquantity] = useState(null);
    const [shipping, setshipping] = useState('Select shipping');
    const [description, setdescription] = useState(null);
    const [image, setimage] = useState(null);
    const [product, setproduct] = useState([]);
    //  product update
    const handleProductUpdate = async (event) => {
        event.preventDefault()
        try {
            // const parts = image.split('/');
            // const filename = parts[parts.length - 1];
            // const imageBlob = new Blob([image], { type: 'image/jpeg' });
            const formData = new FormData()
            formData.append("category", CategoryId);
            formData.append("name", name);
            formData.append("price", price);
            formData.append("quantity", quantity);
            formData.append("shipping", shipping);
            formData.append("description", description);
            formData.append("image", image);
            console.log('formData===', CategoryId, name, price, quantity, shipping, description, image, formData);
            // console.log('image===============================================', image.substring(image.lastIndexOf("/") + 1));
            const data = await axios.put(`${process.env.REACT_APP_API}/admin/update-product/${param.id}`, formData);
            if (data?.data.success) {
                console.log('data', data.data);
                toast.success(data.data.message);
                navigate('/dashboard/admin/Products')
            } else {
                toast.error(data.data.errorMsg);
                console.log('fail');
            };
        } catch (error) {
            console.log(error);
        };

    };
    // single product
    const singleProductData = async (param) => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/product/${param.id}`)
        if (categoryRes.data.success) {
            toast.success(categoryRes.data.message);
            console.log('title====', categoryRes.data.data.shipping);
            setproduct(
                categoryRes.data.data,
            );
            setcategory(categoryRes.data.data.category?.category)
            setCategoryId(categoryRes.data.data.category?._id)
            setname(categoryRes.data.data.name)
            setprice(categoryRes.data.data.price)
            setquantity(categoryRes.data.data.quantity)
            setshipping(categoryRes.data.data.shipping ? "Yes" : "No")
            setdescription(categoryRes.data.data.description)
            setimage(categoryRes.data.data.image)
        } else {
            toast.error(categoryRes.data.errorMsg);
        }

    }
    // category data resived
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
        singleProductData(param)
        categoryData()

    }, [param]);
    console.log('title', product);
    const handleItemClick = (item) => {
        setCategory(item);
    };

    //  create product
    // const handleProductSubmit = async (event) => {
    //     event.preventDefault()
    //     try {
    //         const formData = new FormData()
    //         formData.append("category", CategoryId);
    //         formData.append("name", name);
    //         formData.append("price", price);
    //         formData.append("quantity", quantity);
    //         formData.append("shipping", shipping);
    //         formData.append("description", description);
    //         formData.append("image", image);
    //         const data = await axios.post(`${process.env.REACT_APP_API}/admin/create-product`, formData);
    //         if (data?.data.success) {
    //             console.log('data', data.data);
    //             toast.success(data.data.message);
    //         } else {
    //             toast.error(data.data.errorMsg);
    //             console.log('fail');
    //         };
    //     } catch (error) {
    //         console.log(error);
    //     };
    // };
    const parentProps = {
        Category, category, setcategory, name, setname, price, setprice, quantity, setquantity, shipping, setshipping,
        description, setdescription, image, setimage, selectedItem, setSelectedItem, setCategoryId, handleItemClick, handleProductUpdate
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
                                <Card body className="mb-3"><h4>Edit Product</h4></Card>
                                <ProductEditForm {...parentProps} />

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default ProductEdit