import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { createProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expiresOn, setExpiresOn] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  const [price, setPrice] = useState(0);
  const [negotiable, setNegotiable] = useState(false);
  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    if (success || !userData) {
      history.push("/");
    }
  }, [history, success, userData]);

  const uploadFileHandler = async (e) => {
    console.log(e.target.files[0]);
    setImages(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createProduct(
        name,
        images,
        description,
        category,
        expiresOn,
        shippingAddress,
        shippingCharge,
        price,
        negotiable
      )
    );
  };
  return (
    <>
      <FormContainer>
        <h1>Upload Your Property</h1>
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler} encType="multipart/form-data">
            <Form.Group controlId="name">
              <Form.Label>Name of the property </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter what product do you have"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>
                Image <small> *Upload Image only</small>
              </Form.Label>

              <Form.Control
                id="image-file"
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
                name="photo"
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category like: electronics, books, Furniture.. "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Describe your property </Form.Label>

              <Form.Control
                as="textarea"
                placeholder="Enter description"
                row="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="expiresOn">
              <Form.Label>How long is your product for sale? </Form.Label>
              <Form.Control
                type="date"
                value={expiresOn}
                onChange={(e) => setExpiresOn(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-5" controlId="price">
              <Form.Label>Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="negotiable">
              <Form.Check
                type="checkbox"
                label="Is the price Negotiable?"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group className="mt-5" controlId="shippingaddress">
              <Form.Label>Shipping Address </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter where can you deliver"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="shippingCharge">
              <Form.Label>Shipping Charge </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter how much will you charge for shipping"
                value={shippingCharge}
                onChange={(e) => setShippingCharge(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button className="mb-1" type="submit" variant="primary">
              Upload your property
            </Button>
            {error && <Message variant="danger">{error}</Message>}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
