import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

function Signin() {
  const [details, setDetails] = useState({
    username: "asathwik",
    password: "123456",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { username, password, error, loading, didRedirect } = details;

  const handleChange = (name) => (event) => {
    setDetails({ ...details, error: false, [name]: event.target.value });
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

  const loadingMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: loading ? "" : "none" }}
      >
        Loading
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setDetails({ ...details, error: false, loading: true });
    signin({ username, password })
      .then((data) => {
        if (data.error) {
          setDetails({ ...details, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setDetails({
              username: "",
              password: "",
              error: false,
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (isAuthenticated()) {
        return <Navigate to="/dashboard" />;
      }
    }
  };

  return (
    <Base title="Login">
      {errorMessage()}
      {loadingMessage()}

      <div className="registerCard">
        <Row>
          <Col xs={6}>
            <h2 className="text-center">Sign In</h2>
            <div className="registerBox">
              <Row className="m-2">
                <Col className="mt-2">
                  <label for="username">User Name</label>
                </Col>
              </Row>
              <Row className="m-2">
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
              </Row>
              <p className="mx-3">
                If you didn't have account. Create account{" "}
                <Link to="/register">here</Link>
              </p>
              <div className="registerButton">
                <Button onClick={onSubmit} className="mb-3 mx-3">
                  Login
                </Button>
                <p className="text-dark text center"></p>
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <div className="LoginImage"></div>
          </Col>
        </Row>
      </div>
      {performRedirect()}
    </Base>
  );
}

export default Signin;
