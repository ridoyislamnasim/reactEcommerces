
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';


function ProductForm({ Category, name, setname, price, setprice, quantity, setquantity, shipping, setshipping,
    description, setdescription, image, setimage, selectedItem, handleItemClick, handleProductSubmit }) {

    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedImage(file);
    // };
    return (
        <>
            <form onSubmit={handleProductSubmit}>
                <div className="mb-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="w-100 d-flex justify-content-between align-items-center">
                            {selectedItem}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100">

                            {Category?.map((item, index) => (
                                <Dropdown.Item key={item._id} onClick={() => handleItemClick(item.category)} >{item.category}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="mb-3">
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => { const file = e.target.files[0]; setimage(file) }}
                            accept=".png, .jpg, .jpeg" // Specify allowed file types if needed
                        />
                    </Form.Group>
                    {image && (
                        <div >
                            <p>Selected Image: {image.name}</p>
                            <img height={"200px"} className="rounded mx-auto d-block img img-responsive"
                                src={URL.createObjectURL(image)} // Correct usage of createObjectURL
                                alt="Selected"
                                style={{ maxWidth: '100%', marginTop: '10px' }}
                            />
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter product price"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="Number"
                        className="form-control"
                        placeholder="Enter product quantity"
                        value={quantity}
                        onChange={(e) => setquantity(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="w-100 d-flex justify-content-between align-items-center">
                            {shipping}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100">
                            <Dropdown.Item onClick={() => setshipping('No')} >No</Dropdown.Item>
                            <Dropdown.Item onClick={() => setshipping('Yes')} >Yes</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="mb-3">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            placeholder="Enter your text here"
                        />
                    </Form.Group>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </>
    )
}

export default ProductForm
