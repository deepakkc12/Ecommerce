

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkSimilar } from "../Reducer/Reducer";
const Counter = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [data] = useState({
    id: props.id,
    price: props.price,
    image: props.image
  });
  const dispatch = useDispatch();

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const getQuantity = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
  };

  const addToCart = () => {
    const user = sessionStorage.getItem('username');
    console.log(user);
    if (quantity > 0) {
      const newItem = { ...data, Qty: parseInt(quantity) };
  
      // Fetch the current cart data for the user
      fetch(`http://localhost:8000/cart/${user}`)
        .then(response =>  response.json())
        .then(userCart =>{
          console.log(userCart)
          userCart.items.push(newItem);
          const newCart={...userCart,
          items:checkSimilar(userCart.items)
          }
          console.log(newCart)
          return fetch(`http://localhost:8000/cart/${user}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCart),
          });
        })
        .then(response => {
          // Handle successful response
          console.log(response);
        })
        .catch(error => {
          // Handle errors
          console.error('There was a problem updating the cart:', error);
        });
              dispatch({
        type: "update",
        value: { ...data, Qty: parseInt(quantity) }
      });
    }
  };


  return (
    <>
      <div
        className="mt-3 mb-2 justify-content-center flex-column"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="d-flex mb-3">
          <button
            style={{
              width: "2em",
              textAlign: "center",
              margin: "0 5px"
            }}
            className="btn btn-secondary"
            onClick={decrement}
          >
            -
          </button>
          <input
            type="number"
            className="form-control my-auto text-dark"
            style={{
              width: "80px",
              textAlign: "center",
              margin: "0 5px"
            }}
            onChange={getQuantity}
            value={quantity}
            min={1}
          />
          <button
            style={{
              width: "2em",
              textAlign: "center",
              margin: "0 5px"
            }}
            className="btn btn-secondary"
            onClick={increment}
          >
            +
          </button>
        </div>
        <button onClick={addToCart} className="btn btn-dark w-100">
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default Counter;

