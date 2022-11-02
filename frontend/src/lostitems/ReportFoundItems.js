import Base from "../core/Base";
import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { reportfound } from "./helper/founditemsapi";
import { isAuthenticated } from "../auth/helper";

function ReportFoundItems() {
  const [details, setDetails] = useState({
    itemname: "",
    type: "",
    date: "",
    detail: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setDetails({ ...details, error: false, [name]: event.target.value });
  };

  const { itemname, type, date, detail, success, error } = details;

  const onSubmit = (event) => {
    event.preventDefault();
    setDetails({ ...details, error: false });
    const ls = isAuthenticated();
    console.log(ls);
    if (ls) {
      const lsid = localStorage.getItem("_id");
      reportfound({ itemname, type, details: detail, lsid, date })
        .then((data) => {
          if (data.error) {
            setDetails({ ...details, error: data.error });
          } else {
            setDetails({
              itemname: "",
              type: "",
              date: "",
              detail: "",
              error: false,
              success: true,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setDetails({ ...details, error: "Login before reporting an item." });
      console.log(details);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        Item added successfully.
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

  const setDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + "/" + mm + "/" + dd;
    setDetails({
      ...details,
      date: today,
    });
  };

  return (
    <Base title="Report Found Item">
      {successMessage()}
      {errorMessage()}
      <div className="reportItemCard">
        <Row className="m-2">
          <Col className="mt-2">
            <label for="itemname" className="addMargintop">
              Item Name
            </label>
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="mb-1">
            <input
              type="text"
              name="itemname"
              className="itemname"
              placeholder="Item Name"
              onChange={handleChange("itemname")}
              value={itemname}
            />
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="mt-2">
            <label for="type">Type</label>
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="mb-1">
            <input
              type="text"
              name="type"
              className="type"
              placeholder="Type"
              onChange={handleChange("type")}
              value={type}
            />
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="mt-2">
            <label for="date">Found Date</label>
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="mb-1">
            <input
              type="text"
              name="date"
              className="date"
              placeholder="Date as YYYY/MM/DD"
              onChange={handleChange("date")}
              value={date}
            />
            <button
              type="button"
              onClick={setDate}
              class="btn rounded btn-warning btn-sm mx-2"
            >
              Found today
            </button>
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="mt-2">
            <label for="details">Details of the item</label>
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="mb-1">
            <textarea
              name="detail"
              className="details"
              placeholder="Details"
              onChange={handleChange("detail")}
              value={detail}
            />
          </Col>
        </Row>
        <div className="reportButton">
          <Button onClick={onSubmit} className="mb-3 mx-3">
            Report
          </Button>
        </div>
      </div>
    </Base>
  );
}

export default ReportFoundItems;
