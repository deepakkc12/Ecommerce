import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, json } from "react-router-dom";

function Register() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setsecondName] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("male");
  const [addres, setaddres] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [secondNameError, setsecondNameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [idError, setIdError] = useState("");

  async function existingUser(id) {
    try {
      const response = await fetch("http://localhost:8000/user");
      const user = await response.json();
      const existinguser = user.find((value) => value.id === id);
      console.log(existinguser)
      return !!existinguser; 
    } catch (error) {
      return false;
    }
  }

  
  const validate = async () => {
    let isValidate = true;
    console.log("Validating...");
    if (firstName === "") {
      isValidate = false;
      setFirstNameError("Enter First name");
    }
    if (secondName === "") {
      isValidate = false;
      setsecondNameError("Enter Second name");
    }
    if (password === "" || password.length < 8) {
      isValidate = false;
      setpasswordError("Enter valid password : password must have 8 chars");
    }
    if (phoneNumber === "" || isNaN(phoneNumber || phoneNumber < 10)) {
      isValidate = false;
      setPhoneNumberError("Enter valid phone number");
    }


    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(id)) {
      try {
        console.log("Checking existing user...");
        const existing = await existingUser(id);
        console.log("Existing user:", existing);
        if (existing) {
          setIdError("Email already used");
          isValidate = false;
        } else {
          setIdError("");
        }
      } catch (error) {
        console.error("Error checking existing user:", error.message);
        setIdError("An error occurred while checking the email");
        isValidate = false;
      }
    } else {
      isValidate = false;
      setIdError("Enter a valid email");
    }
    console.log("Validation result:", isValidate);
    return isValidate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate(); // Wait for validation to complete
    if (isValid) {
      const userdata = {
        id,
        firstName,
        secondName,
        password,
        phoneNumber,
        gender,
        addres,
      };
      console.log(userdata);
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userdata),
      })
        .then((res) => {
          if (res.ok) {
            console.log("registered successfully");
          } else {
            throw new Error("Registration failed. Please try again.");
          }
        })
        .catch((err) => console.error(err.message));
       const userCart={id,items:[]}
        fetch('http://localhost:8000/cart',{
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userCart),
        }).then((res) => {
          if (res.ok) {
            console.log("Cart initiated successfully");
          } else {
            throw new Error("Registration failed. Please try again.");
          }
        })
        .catch((err) => console.error(err.message));
    }
  };
  return (
    <>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1 className="text-primary text-center">Register</h1>
            </div>
            <div className="card-body">
              <Container>
                <Row className="mb-3">
                  <Col lg={6} className="form-group">
                    <label>
                      First name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={firstName}
                      onFocus={() => {
                        setFirstNameError("");
                      }}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                    ></input>
                    <label className="text-center text-danger">
                      {firstNameError}
                    </label>
                  </Col>
                  <Col lg={6} className="form-group">
                    <label>
                      Second name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={secondName}
                      onFocus={() => {
                        setsecondNameError("");
                      }}
                      onChange={(e) => {
                        setsecondName(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                    ></input>
                    <label className="text-center text-danger">
                      {secondNameError}
                    </label>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={6} className="form-group">
                    <label>
                      E-mail<span className="text-danger">*</span>
                    </label>
                    <input
                      value={id}
                      onFocus={() => {
                        setIdError("");
                      }}
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                    ></input>
                    <label className="text-center text-danger">{idError}</label>
                  </Col>
                  <Col lg={6} className="form-group">
                    <label>
                      Password<span className="text-danger">*</span>
                    </label>
                    <input
                      value={password}
                      onFocus={() => {
                        setpasswordError("");
                      }}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      type="password"
                      className="form-control"
                    ></input>
                    <label className="text-center text-danger">
                      {passwordError}
                    </label>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={6} className="form-group">
                    <label>
                      Phone Number<span className="text-danger">*</span>
                    </label>
                    <input
                      value={phoneNumber}
                      onFocus={() => {
                        setPhoneNumberError("");
                      }}
                      onChange={(e) => {
                        setphoneNumber(e.target.value);
                      }}
                      type="number"
                      className="form-control"
                    ></input>
                    <label className="text-center text-danger">
                      {phoneNumberError}
                    </label>
                  </Col>
                  <Col lg={6} className="form-group">
                    <label>
                      Gender<span className="text-danger">*</span>
                    </label>
                    <br></br>
                    <input
                      type="radio"
                      checked={gender === "male"}
                      onChange={(e) => {
                        setgender(e.target.value);
                      }}
                      name="gender"
                      value="male"
                      className="form-check-input"
                    ></input>
                    <label className="form-check-label">Male</label>
                    <input
                      checked={gender === "female"}
                      onChange={(e) => {
                        setgender(e.target.value);
                      }}
                      type="radio"
                      name="gender"
                      value="female"
                      className="form-check-input "
                    ></input>
                    <label>Female</label>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12}>
                    <label>Addres</label>
                    <textarea
                      value={addres}
                      onChange={(e) => {
                        setaddres(e.target.value);
                      }}
                      className="form-control"
                    ></textarea>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary mx-5">
                Register
              </button>
              <button type="submit" className="btn btn-success">
                <Link className=" text-decoration-none text-white" to="/">
                  go to Login
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Register;
