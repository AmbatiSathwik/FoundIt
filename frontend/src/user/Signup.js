import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { signup, isAuthenticated, authenticate} from "../auth/helper/index";
import Base from "../core/Base";

function Signup() {
  const [details, setDetail] = useState({
    firstname: "",
    lastname: "",
    email: "",
    roll: "",
    username: "",
    password: "",
    confpassword: "",
    error: false,
    success: false,
    didRedirect: false
  });

  const {
    firstname,
    lastname,
    email,
    roll,
    username,
    password,
    error,
    success,
    didRedirect
  } = details;

  const handleChange = (name) => (event) => {
    setDetail({ ...details, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (details.password !== details.confpassword) {
      setDetail({ ...details, error: true });
    }

    signup({ firstname, lastname, email, roll, username, password })
      .then((data) => {
        if (data.error) {
          setDetail({ ...details, error: data.error , success:false});
        } else {
          authenticate(data,()=>{
            setDetail({
              firstname: "",
              lastname: "",
              email: "",
              roll: "",
              username: "",
              password: "",
              confpassword: "",
              error: false,
              success: true,
              didRedirect: true
            });
          })
          
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account create successfully. Please <Link to='/login'>login here.</Link> 
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-warning"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (isAuthenticated()) {
        return <Navigate to="/dashboard" />;
      }
    }
  };

  return (
    <Base title="Register Account">
      <div className="registerCard">
        {successMessage()}
        {errorMessage()}
        <Row>
          <Col xs={6}>
            <h2 className="text-center">Sign Up</h2>
            <div className="registerBox">
              <Row className="m-2">
                <Col className="mt-2">
                  <label for="fname">First Name</label>
                </Col>
                <Col className="mt-2">
                  <label for="lname">Last Name</label>
                </Col>
              </Row>
              <Row className="m-2">
                <Col className="mb-1">
                  <input
                    type="text"
                    name="fname"
                    className="fname"
                    placeholder="First Name"
                    onChange={handleChange("firstname")}
                    value={firstname}
                  />
                </Col>
                <Col className="mb-1">
                  <input
                    type="text"
                    name="lname"
                    className="lname"
                    placeholder="Last Name"
                    onChange={handleChange("lastname")}
                    value={lastname}
                  />
                </Col>
              </Row>
              <Row className="m-2">
                <Col className="mt-2">
                  <label for="mailId">Email</label>
                </Col>
              </Row>
              <Row className="m-2">
                <Col className="mb-1">
                  <input
                    type="email"
                    name="mailId"
                    className="mailId"
                    size="67"
                    placeholder="Email Id"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </Col>
              </Row>
              <Row className="m-2">
                <Col className="mt-2">
                  <label for="roll">Roll Number</label>
                </Col>
                <Col className="mt-2">
                  <label for="username">User Name</label>
                </Col>
              </Row>
              <Row className="m-2">
                <Col className="mb-1">
                  <input
                    type="text"
                    name="roll"
                    className="roll"
                    placeholder="Roll Number"
                    onChange={handleChange("roll")}
                    value={roll}
                  />
                </Col>
                <Col className="mb-1">
                  <input
                    type="text"
                    name="username"
                    className="username"
                    placeholder="User Name"
                    onChange={handleChange("username")}
                    value={username}
                  />
                </Col>
              </Row>
              <Row className="m-2">
                <Col className="mt-2">
                  <label for="pass">Password</label>
                </Col>
                <Col className="mt-2">
                  <label for="confpass">Confirm Password</label>
                </Col>
              </Row>
              <Row className="m-2">
                <Col className="mb-1">
                  <input
                    type="password"
                    name="pass"
                    className="pass"
                    placeholder="PassWord"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </Col>
                <Col className="mb-1">
                  <input
                    type="password"
                    name="confpass"
                    className="confpass"
                    placeholder="Confirm Password"
                    onChange={handleChange("confpassword")}
                    value={details.confpassword}
                  />
                </Col>
              </Row>
              <p className="mx-3">
                If you already have account.<Link to="/login">Login here</Link>
              </p>
              <div className="registerButton">
                <Button onClick={onSubmit} className="mb-3 mx-3">
                  Create Account
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <div className="registerImage"></div>
          </Col>
        </Row>
      </div>
      {performRedirect()}
    </Base>
  );
}

export default Signup;
