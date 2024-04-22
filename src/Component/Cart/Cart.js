import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Cart() {
  const [total, setTotal] = useState(0);
  const [cartList, setCartlist] = useState([]);
  const [deleted,setDeleted]=useState()
  const dispatch = useDispatch();

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    fetch(`http://localhost:8000/cart/${user}`, { method: "GET" })
      .then((resp) => resp.json())
      .then((resp) => {
        setCartlist(resp.items);
        console.log(resp.items);
      })
      .catch((err) => console.log(err));
  }, [deleted]);

  useEffect(() => {
    if (cartList && cartList?.length !== 0) {
      const t = cartList.reduce((tot, item) => {
        return tot + item.price * item.Qty;
      }, 0);
      setTotal(t);
    } else {
      setTotal(0);
    }
  }, [cartList]);

  const getDetial = (id) => {
    dispatch({
      type: "update_selected_product_id",
      value: id,
    });
  };
  const deleteItem = (id) => {

    const user = sessionStorage.getItem('username');
    console.log(user);
      // Fetch the current cart data for the user
      fetch(`http://localhost:8000/cart/${user}`)
        .then(response =>  response.json())
        .then(userCart =>{
          setDeleted(userCart)
          const newCart={...userCart,
          items:userCart.items.filter((value) => value.id !== id)
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
    

    // const cart = cartList.filter((value) => value.id !== id);
    // console.log(cart);
    // dispatch({
    //   type: "remove_from_cart",
    //   value: cart,
    // });
  };
  const changeQuantity = (id) => {
    console.log(id);
  };
  console.log(cartList);
  return (
    <>
      <Navbar
        bg="light"
        expand="md"
        className="mb-4"
        style={{ position: "sticky", top: "3px" }}
      >
        <Container>
          <div className=" navbar-collapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              <Link to="/products" className="nav-item nav-link ">
                Home
              </Link>
              <Link to="/cart" className="nav-item nav-link X">
                <img
                  src="/cart.png"
                  className="text-primary"
                  style={{ width: "30px", height: "30px", opacity: "1" }}
                />
              </Link>
            </div>
          </div>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center text-primary mb-5">Shopping Cart</h1>
            {cartList.length > 0 ? (
              <>
                <div className="mb-3">
                  <Row className="font-weight-bold">
                    <Col xs={2} className="text-center ">
                      <h3 className="text-center border-bottom pb-3">Sl NO</h3>
                    </Col>
                    <Col xs={2} className="text-center ">
                      <h3 className="text-center border-bottom pb-3">
                        Product
                      </h3>
                    </Col>
                    <Col xs={2} className="text-center ">
                      <h3 className="text-center border-bottom pb-3">Price</h3>
                    </Col>
                    <Col xs={2} className="text-center ">
                      <h3 className="text-center border-bottom pb-3">
                        Quantity
                      </h3>
                    </Col>
                    <Col xs={2} className="text-center ">
                      <h3 className="text-center border-bottom pb-3">Total</h3>
                    </Col>
                    <Col xs={2} className="text-center  "></Col>
                  </Row>
                </div>
                {cartList.map((item, index) => {
                  return (
                    <Row key={item.id} className="mb-3">
                      <Col xs={2} className="text-center ">
                        <p>{index + 1}</p>
                      </Col>
                      <Col xs={2} className="d-flex justify-content-around">
                        <span>{item.id}</span>
                        <Link
                          to="/product_detials"
                          onClick={() => getDetial(item.id)}
                        >
                          <img
                            src={item.image}
                            className="rounded"
                            style={{
                              width: "50px",
                              height: "50px",
                              opacity: "1",
                            }}
                          />
                        </Link>
                      </Col>
                      <Col xs={2} className="d-flex justify-content-around">
                        ₹{parseFloat(item.price)}
                      </Col>
                      <Col
                        xs={2}
                        className="d-flex justify-content-around"
                        onDoubleClick={() => {
                          changeQuantity(item.id);
                        }}
                      >
                        {item.Qty}
                      </Col>
                      <Col xs={2} className="d-flex justify-content-around">
                        ₹{parseFloat(item.price) * parseInt(item.Qty)}
                      </Col>
                      <Col xs={2} className="text-center ">
                        <button
                          className="text-center btn btn-danger"
                          onClick={() => {
                            deleteItem(item.id);
                          }}
                        >
                          delete
                        </button>
                      </Col>
                    </Row>
                  );
                })}
                <h4 className="text-center mt-5 text-success">
                  Total: ₹ {total}
                </h4>
                <Button variant="primary" className="d-block mx-auto mt-3  ">
                  Buy All
                </Button>
              </>
            ) : (
              <Container>
                <Row>
                  <Col md={4} className="border m-auto p-5 mt-5">
                    <h1 className="text-center text-secondary">
                      Your Cart is Empty ☹️
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col md={2} className=" m-auto p-3 mt-3">
                    <Link
                      to="/products"
                      className="text-center text-white nav-item nav-link bg-success rounded"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Buy now
                    </Link>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart;
