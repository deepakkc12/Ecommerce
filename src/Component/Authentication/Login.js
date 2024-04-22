import { Link, json, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validation = () => {
    let isValidate = true;
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username)) {
    } else {
      isValidate = false;
      setUsernameError("enter a valid username");
    }
    // if(password==="" || password.length<8){
    //     isValidate=false;
    //     setPasswordError("Enter valid password")
    // }
    return isValidate;
  };

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validation()) {
      fetch("http://localhost:8000/user/" + username)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp.password);
          if (Object.keys(resp).length === 0) {
            setError("username does not match");
          } else {
            if (resp.password === password) {
              navigate("/products");
              sessionStorage.setItem("username", username);
            } else {
              setError("password and username does not match");
            }
          }
        })
        .catch((err) => setError("login Failed, user not found "));
    }
  };
  return (
    <>
      {" "}
      <div className="offset-lg-3 col-lg-6">
        <form onSubmit={proceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h1 className="text-primary text-center">Login</h1>
            </div>
            <div className="card-body">
              <Container>
                <Row>
                  <Col lg={3}></Col>
                  <Col lg={6}>
                    <label>User name</label>
                    <input
                      onFocus={() => {
                        setError("");
                        setUsernameError("");
                      }}
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Enter email"
                    ></input>
                    <label className="text-center text-danger">
                      {userNameError}
                    </label>
                  </Col>
                  <Col lg={3}></Col>
                </Row>
                <Row>
                  <Col lg={3}></Col>
                  <Col lg={6}>
                    <label>Pasword</label>
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      onFocus={() => {
                        setError("");
                        setPasswordError("");
                      }}
                      value={password}
                      type="password"
                      className="form-control"
                    ></input>
                    <label className="text-center text-danger">
                      {passwordError}
                    </label>
                  </Col>
                  <Col lg={3}></Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <p className="text-center text-danger">{error}</p>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary mx-5">
                Login
              </button>
              <button type="submit" className="btn btn-success">
                <Link
                  className=" text-decoration-none text-white"
                  to="/register"
                >
                  New User
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
