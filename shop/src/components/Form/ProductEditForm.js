
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function ProductEditForm({ Category, category, setcategory, name, setname, price, setprice, quantity, setquantity, shipping, setshipping,
    description, setdescription, image, setimage, selectedItem, setSelectedItem, setCategoryId, handleItemClick, handleProductSubmit }) {
    // const [selected, setSelected] = useState('Select Category');

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedImage(file);
    // };
    return (
        <>
            <form onSubmit={handleProductSubmit}>
                <div className="mb-3">
                    <FloatingLabel controlId="floatingSelect" label="Shipping with selects">
                        <Form.Select value={category} onChange={(e) => setcategory(e.target.value)} aria-label="Floating label select example">
                            {Category?.map((item, index) => (
                                // <Dropdown.Item key={item._id} onClick={() => { setCategoryId(item._id); setSelectedItem(item.category) }} >{item.category}</Dropdown.Item>
                                <option key={item._id} value={item.category} >{item.category}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </div>
                <div className="mb-3">
                    <Form.Group controlId="formFile" className="mb-3">

                        <Form.Control
                            type="file"
                            // value={image}
                            // onChange={(e) => { const file = e.target.files[0]; setimage(file) }}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        // Set the image data URL in the state to display the selected image
                                        setimage(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            accept=".png, .jpg, .jpeg" // Specify allowed file types if needed
                        />
                    </Form.Group>

                    {image && (
                        <div>
                            <h2>Selected Image:</h2>
                            <img height={"200px"} src={image} className="rounded mx-auto d-block img img-responsive" alt="Selected" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                    {/* {image && (
                        <div >
                            <p>Selected Image: {image.name}</p>
                            <img height={"200px"} className="rounded mx-auto d-block img img-responsive"
                                // src={image} // Correct usage of createObjectURL
                                src={image}
                                alt="Selected"
                                style={{ maxWidth: '100%', marginTop: '10px' }}
                            />
                        </div>
                    )} */}
                </div>
                {/* Name */}
                <div className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Product Name"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setquantity(e.target.value)} />
                    </FloatingLabel>
                </div>
                {/* Price */}
                <div className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Product Price"
                        className="mb-3"
                    >
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) => setquantity(e.target.value)} />
                    </FloatingLabel>
                </div>
                {/* quantity */}
                <div className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Product Quantity"
                        className="mb-3"
                    >
                        <Form.Control
                            type="number"
                            placeholder="Enter product quantity"
                            value={quantity}
                            onChange={(e) => setquantity(e.target.value)} />
                    </FloatingLabel>
                </div>
                <div className="mb-3">
                    <FloatingLabel controlId="floatingSelect" label="Shipping with selects">
                        <Form.Select value={shipping} onChange={(e) => setshipping(e.target.value)} aria-label="Floating label select example">
                            <option value="No" >No</option>
                            <option value="Yes" >Yes</option>
                        </Form.Select>
                    </FloatingLabel>
                </div>
                <div className="mb-3">
                    <FloatingLabel controlId="floatingTextarea2" label="Description">
                        <Form.Control
                            as="textarea"
                            value={description}
                            placeholder="Product Description"
                            style={{ height: '100px' }}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                    </FloatingLabel>
                </div>
                <div class="mb-3 d-flex justify-content-between ">
                    <button type="submit" class="btn  m-3 flex-fill btn-success">
                        Edit Product
                    </button>
                    <button type="submit" class="btn  m-3 flex-fill btn-danger">
                        Delete Product
                    </button>
                </div>
            </form>

        </>
    )
}

export default ProductEditForm
