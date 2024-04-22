import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react"; // Import useState
import './GotoCart.css';

function GotoCart() {
  const [cartCount, setCartCount] = useState(); // State to store cart count
  const prevCartCountRef = useRef(0); // Ref to store previous cart count

  const cart = useSelector((data) => data.cart);
  const [cartlist,setCartlist]=useState()
 const [added,setAdded]=useState(0)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = sessionStorage.getItem('username');
  //     console.log(1);
  //     // Fetch the current cart data for the user
  //     let response = await fetch(`http://localhost:8000/cart/${user}`);
  //     console.log(2);
  //     let data = await response.json(); console.log(3);
  //     console.log(data.items);
  //     setCartlist(data.items);
  //     setAdded(added+1)
  //     console.log(4);
  //   };
  // }, [cart]);
  // useEffect(()=>{
  //   console.log(5)
  //   const prevCartCount = prevCartCountRef.current;
  //   if (cartlist && cartlist.length !== prevCartCount) {
  //     const span = document.getElementById("span");
  //     span.classList.remove("moveDown"); // Remove previous animation class
  //     void span.offsetWidth; // Trigger reflow to restart animation
  //     span.classList.add("moveDown"); // Add animation class
  //     prevCartCountRef.current = cartlist.length;
  //     setCartCount(cartlist.length);
  //   }
  // },[added])
  useEffect(() => {
    (async () => {
      const user = sessionStorage.getItem('username');
      console.log(user);
  
      try {
        // Fetch the current cart data for the user
        let response = await fetch(`http://localhost:8000/cart/${user}`);
        let data = await response.json();
        console.log(1)
        setCartlist(data.items);
        console.log(2)
  
        const prevCartCount = prevCartCountRef.current;
  
        // Ensure cartlist is initialized before accessing its length
        if (cartlist && cartlist.length !== prevCartCount) {
        console.log(3)
          const span = document.getElementById("span");
          span.classList.remove("moveDown"); // Remove previous animation class
          void span.offsetWidth; // Trigger reflow to restart animation
          span.classList.add("moveDown"); // Add animation class
          prevCartCountRef.current = cartlist.length;
          setCartCount(cartlist.length);
        }
      } catch (error) {
        console.log(4)
        console.error('Error fetching cart data:', error);
      }
    })();
    console.log(5)
    
  }, [cart]);
  
  

  return (
    <>
      <Navbar
        bg="light"
        className="mb-4 rounded"
        style={{
          position: "fixed",
          bottom: "1px",
          right: "0",
          zIndex: "1",
          width: "fit-content",
          marginLeft: "auto",
        }}
      >
        <Container>
          <div className=" navbar-collapse">
            <div
              className="navbar-nav ms-auto p-2 p-lg-0"
              style={{ position: "relative" }}
            >
              <Link to="/cart" className="nav-item nav-link text-success">
                Go to
                <img
                  src="/cart.png"
                  className="text-primary"
                  style={{ width: "30px", height: "30px", opacity: "1" }}
                  alt="Cart"
                />
                <span
                  id="span"
                  className="box animated"
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "25px",
                    width: "25px",
                    position: "absolute",
                    borderRadius: "50%",
                    color: "red",
                    zIndex: "1",
                    top: "-5px",
                    right: "1px",
                    padding: "0",
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  {cartlist&&cartCount}
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default GotoCart;
