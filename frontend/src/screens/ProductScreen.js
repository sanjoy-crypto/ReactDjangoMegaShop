import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card,Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from '../actions/productActions'

// import products from "../products";

const ProductScreen = () => {
  const  [qty,setQty] = useState(1)
  const { id } = useParams();
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  const navigate = useNavigate()

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  // const product = products.find((p) => p._id === id);

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [id]);

  return (
    <div>
      <Link to="/" className="btn btn-secondary my-3">
        Go Back
      </Link>
      { loading ? 
        <Loader/> 
        : error 
        ? <Message variant='danger'>{error}</Message>
        : <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>

                    <Col xs='auto' className="my-1">
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e)=>setQty(e.target.value)}
                      >
                        {
                          [...Array(product.countInStock).keys()].map((x)=>(
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }

                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>


            </ListGroup>
          </Card>
        </Col>
      </Row>
      }
      


    </div>
  );
};

export default ProductScreen;
