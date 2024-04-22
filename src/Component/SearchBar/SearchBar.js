import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function SearchBar() {
  const allProducts = useSelector((data) => data.allProducts);
  const [productTitles, setProductTitles] = useState();
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState();
  const dispatch = useDispatch();

  function search(arr, key) {
    if (key) {
      var result = [];
      arr.forEach((element) => {
        if (element.title.includes(key)) {
          result.push(element);
        }
      });
    }
    if (result && result.length === 0) {
        result = "Product not found!☹️";
    }
    return result;
  }

  const getDetial = (id) => {
    
    dispatch({
      type: "update_selected_product_id",
      value: id,
    });
    setSearchName('')
  };

  useEffect(() => {
    var titles = allProducts.map((value) => {
      return {
        title: value.title.toLowerCase(),
        id: value.id,
        image: value.images[0],
      };
    });
    setProductTitles(titles);
    console.log(productTitles);
  }, [allProducts]);

  const getName = (event) => {
    var text = event.target.value;
    setSearchName(text);
  };
  useEffect(() => {
    var result = search(productTitles, searchName);
    setSearchResult(result);
  }, [searchName]);

  return (
    <Container className="form-goup my-3">
      <Row>
        <Col md={12}>
          <input
            // onBlur={()=>setSearchName("")}
            type="text"
            placeholder="🔍  Search products"
            className="form-control"
            value={searchName}
            onChange={getName}
            style={{ width: "200px", marginLeft: "auto" }}
          />
          {searchResult&&searchResult!=="Product not found!☹️"? (
            <div
              className="d-flex flex-column"
              style={{
                zIndex: "1",
                position: "absolute",
                right: "20px",
                width: "fit-content",
                top: "60px",
                maxHeight: "300px",
                overflow: "auto",
              }}
            >
              {searchResult.map((value) => {
                return (
                  <Link
                  key={value.id}
                    to="/product_detials"
                    className="btn btn-light d-flex align-items-center justify-content-center "
                    style={{
                      padding: "0",
                      marginBottom: "1.5px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    <img
                      className="rounded mx-2"
                      src={value.image}
                      style={{ width: "30px", height: "30px" }}
                    />{" "}
                    <p onClick={() => getDetial(value.id)}> {value.title}</p>
                  </Link>
                );
              })}
            </div>
            ) : (
            <div
            style={{ width: "200px", marginLeft: "auto" }}
            >
              <p
              className="text-warning"
                style={{
                  padding: "0",
                  marginBottom: "1.5px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                {searchResult}
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default SearchBar;
