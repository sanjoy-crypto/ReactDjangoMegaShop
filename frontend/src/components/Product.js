import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} />
        </Link>
        <Card.Body className="px-1">
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div" className="oneline">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </div>
          </Card.Text>

          <Card.Text as="h4">${product.price}</Card.Text>
          {/*           
          <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
