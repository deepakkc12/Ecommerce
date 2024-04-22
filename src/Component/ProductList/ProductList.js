import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Counter from "../Counter/Counter";
import {motion} from 'framer-motion'

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const [pages, setPages] = useState([]);

  const allProducts = useSelector((data) => data.allProducts);

  const dispatch = useDispatch();

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  // .....................................................................................

  useEffect(() => {
    setProductList(allProducts.slice(firstPostIndex, lastPostIndex));
    var page = [];
    for (let i = 1; i <= Math.ceil(allProducts.length / postPerPage); i++) {
      page.push(i);
    }
    setPages(page);
  }, [currentPage, allProducts]);


  const getDetial = (id) => {
    dispatch({
      type: "update_selected_product_id",
      value: id,
    });
  };

  // ................................................................................


  return (
    
    <>
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Container style={{position:'relative'}}>
      <SearchBar/>
        <Row>
          {productList.map((value, i) => {
            return (
              <Col md={4} key={i} className="card  mb-5">
                <h4 className="text-secondary text-center" style={{minHeight:'3rem'}}>{value.title}</h4>
                <Link to="/product_detials">
                  <img   
                    className="rounded img-fluid h-300"
                    src={value.images[0]}
                    onClick={() => getDetial(value.id)}
                  />
                </Link>
                <p
                    className="text-success text-center w-100"
                    style={{
                      marginRight: "auto",
                      marginLeft: "3px",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom:'0'
                    }}
                  >
                    ₹ {" " + value.price}
                  </p>
                <Counter key={value.id} id={value.id} price={value.price} image={value.images[0]}/>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Container>
        <Row>
          <Col
            md={12}
            className="d-flex justify-content-center align-items-center border-bottom border-top mb-5"
          >
            {pages.map((page, index) => {
              return (
                <button
                  className={
                    currentPage === page
                      ? "btn btn-secondary mx-2"
                      : "btn btn-active mx-2"
                  }
                  key={index}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </Col>
        </Row>
      </Container>
  </motion.div>
      
    </>
  );
}
export default ProductList;