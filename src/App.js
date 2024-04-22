import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Component/Cart/Cart";
import ProductDetials from "./Component/ProductDetials/ProductDetials";
import Product from "./Component/products/Product";
import CatogeryPage from "./Component/CatogeryPage/CatogeryPage";
import Login from "./Component/Authentication/Login";
import Register from "./Component/Authentication/Register";
function App() {

  const [loading,setLoading]=useState(true)
  const dispatch = useDispatch();

  async function fetchData(requestOptions) {
    var result = await fetch(
      "http://localhost:8000/products",
      requestOptions
    );
    result = await result.json();
    setLoading(false)
    console.log(result)
    dispatch({
      type: "update_all_products",
      value: result,
    });
  }

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetchData(requestOptions).catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Product></Product>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/products" element={<Product loading={loading}></Product>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route
          path="/product_detials"
          element={<ProductDetials></ProductDetials>}
        ></Route>
        <Route
          path="/catogery_page"
          element={<CatogeryPage></CatogeryPage>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
