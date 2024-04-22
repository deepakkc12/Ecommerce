import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GotoCart from "../GotoCart/GotoCart";
import Counter from "../Counter/Counter";
function CatogeryPage() {
  const [list, setList] = useState();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const [pages, setPages] = useState([]);
  const selectedCategoryId = useSelector((data) => data.selectedCategoryId);

  const allProducts = useSelector((data) => data.allProducts);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  // console.log(prop.allList)
  // console.log(prop.categoryId)
  function categoryProducts(arr, id) {
    return arr.filter((value, i) => {
      return value.category.id === id;
    });
  }

  const getDetial = (id) => {
    dispatch({
      type: "update_selected_product_id",
      value: id,
    });
  };

  // .......................................................................................................

  useEffect(() => {
    if (selectedCategoryId !== undefined) {
      var tempList = categoryProducts(allProducts, selectedCategoryId);
      setList(tempList.slice(firstPostIndex, lastPostIndex));
      var page = [];
      for (let i = 1; i <= Math.ceil(tempList.length / postPerPage); i++) {
        page.push(i);
      }
      setPages(page);
    }
  }, [selectedCategoryId, currentPage]);

  

  return (
    <>
      <GotoCart></GotoCart>

      {list && list[0] !== undefined ? (
        <>
          <Container>
            <Row>
              <Col md={12}>
                <h1 className="text-center text-primary my-3">
                  {list[0].category.name}
                </h1>
              </Col>
            </Row>
            <Row className="mt-5">
              {list.map((value, i) => {
                return (
                  <Col md={4} key={i} className="card  mb-5">
                    <h4 className="text-secondary text-center" style={{minHeight:'3rem'}}>
                      {value.title}
                    </h4>
                    <Link to="/product_detials">
                      <img
                        className="rounded img-fluid h-300"
                        src={value.images[0]}
                        onClick={() => getDetial(value.id)}
                      />
                    </Link>
                    <Counter key={value.id} id={value.id} price={value.price} image={value.images[0]}></Counter>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      ) : (
        "not found"
      )}
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
    </>
  );
}
export default CatogeryPage;
