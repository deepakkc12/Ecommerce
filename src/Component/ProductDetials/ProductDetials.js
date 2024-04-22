import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageSlider from "./ImageSlider/Imageslider";
import { useDispatch, useSelector } from "react-redux";
import GotoCart from "../GotoCart/GotoCart";
import Counter from "../Counter/Counter";
function ProductDetials() {
  const [selectedProduct, setSelectedProduct] = useState();
  const [images, setImages] = useState();
  const dispatch = useDispatch();

  const selectedProductId = useSelector((data) => data.selectedProductId);
  const allProducts = useSelector((data) => data.allProducts);

  const getpdt = (arr, i) => {
    return arr.find((value) => value.id === i);
  };

  // .............................................................

  useEffect(() => {
    if (selectedProductId !== undefined) {
      const pdt = getpdt(allProducts, selectedProductId);
      if (pdt) {
        setSelectedProduct(pdt);
        setImages(pdt.images ? pdt.images : []);
        //console.log(images)
      } else {
        console.log("Product not found");
      }
    }
  }, [selectedProductId]);

  // .........................................................................

  //   useEffect(() => {
  //     if (prop.detial !== undefined) {
  //       setId(prop.detial);
  //       console.log(id)
  //       const pdt = getpdt(prop.allList, id);
  //       if (pdt) {
  //         setProductD(pdt);
  //         console.log(productD)
  //         setImages(pdt.images?pdt.images:[])
  //         console.log(images)
  //       } else {
  //         console.log("Product not found");
  //       }
  //     }
  //   }, [id]);

  const addCart = () => {
    const element = document.getElementById("qty");
    const value = parseInt(element.innerHTML);
    dispatch({
      type: "update",
      value: {
        id: selectedProduct.id,
        Qty: value,
        price: selectedProduct.price,
        image: selectedProduct.images[0],
      },
    });
  };

  const increment = () => {
    const element = document.getElementById("qty");
    const value = parseInt(element.innerHTML);
    element.innerHTML = value + 1;
  };
  const decrement = () => {
    const element = document.getElementById("qty");
    const value = parseInt(element.innerHTML);
    if (value > 1) {
      element.innerHTML = value - 1;
    }
  };
  return (
    <>
      {selectedProduct ? (
        <>
          <GotoCart></GotoCart>
          <Container>
            <Row>
              <Col md={12}>
                <h1 className="text-center text-primary mt-5">
                  {selectedProduct.title}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col md={4}></Col>
              <Col md={4} className=" mt-5 align-items-center p-0">
                <ImageSlider images={images} />
              </Col>
              <Col
                md={4}
                className="mt-5 d-flex justify-content-center flex-column"
              >
                <p
                  className="text-success w-100"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  Price: ₹ {" " + selectedProduct.price}
                </p>
                <Counter id={selectedProduct.id} price={selectedProduct.price} image={selectedProduct.images[0]}></Counter>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        'Loading............................'
      )}
    </>
  );
}
export default ProductDetials;
