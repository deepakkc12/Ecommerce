import { Container, Row, Col } from "react-bootstrap";
import ProductList from "../ProductList/ProductList";
import GotoCart from "../GotoCart/GotoCart";
import CatgeryNav from "../CatogeryNav/CatogeryNav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Spinner} from 'react-bootstrap'
function Product({ loading }) {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  let user = sessionStorage.getItem("username");
  useEffect(() => {
    if (user === "" || user === null) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <GotoCart></GotoCart>

        <>
          <Container>
            <Row>
              <Col md={12} className="mb-3">
                <h1 className="text-center text-primary border-bottom pb-3">
                  Product List
                </h1>
                <span
                  onClick={logout}
                  style={{ float: "right" }}
                  className="my-3  text-info"
                >
                  Logined as <span className="text-success">{user}</span>
                  <button className="btn mx-3 btn-danger">Logout</button>
                </span>
              </Col>
            </Row>
          </Container>
          <CatgeryNav></CatgeryNav>
        </>
      
      
      <ProductList></ProductList>
    </>
  );
}
export default Product;
