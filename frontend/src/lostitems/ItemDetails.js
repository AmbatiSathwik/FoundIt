import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Base from "../core/Base";
import { founditemdetails } from "./helper/founditemsapi";
import { lostitemdetails } from "./helper/lostitemsapi";
import Lost from "./lostitem.jpg";

function ItemDetails() {
  const location = useLocation();

  const id = location.pathname.slice(13, 37);
  console.log(id);
  const status = location.pathname.slice(38).toUpperCase();

  const [details, setDetails] = useState({
    itemname: "",
    type: "",
    date: "",
    details: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    if (status === "LOST") {
      lostitemdetails(id).then((res) => {
        setDetails({
          ...details,
          itemname: res[0].itemname,
          type: res[0].type,
          date: res[0].date,
          details: res[0].details,
          firstname: res[1].firstname,
          lastname: res[1].lastname,
          email: res[1].email,
        });
      });
    } else {
      founditemdetails(id).then((res) => {
        setDetails({
          ...details,
          itemname: res[0].itemname,
          type: res[0].type,
          date: res[0].date,
          details: res[0].details,
          firstname: res[1].firstname,
          lastname: res[1].lastname,
          email: res[1].email,
        });
      });
    }
  }, []);

  const OorF = status === "LOST" ? "Owner" : "Founder";

  return (
    <Base title="Item Details">
      <div>
        <div className="userCard">
          <Row>
            <Col xs={4}>
              <img src={Lost} alt="Lost icon" />
            </Col>
            <Col xs={8}>
              <div className="userDetails">
                <br />
                <Row>
                  <Col>
                    <span>Item Name: &emsp;</span>
                    <span>{details.itemname.toUpperCase()}</span>
                  </Col>
                  <Col>
                    <span>Type: &emsp;</span>
                    <span>{details.type.toUpperCase()}</span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <span>Status: &emsp;</span>
                    <span>{status}</span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <span>Date: &emsp;</span>
                    <span>
                      {details.date.slice(0, 10).split("-").reverse().join("-")}
                    </span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <div>Details: &emsp;</div>
                    <br />
                    <span>{details.details}</span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <span>{OorF} Name: &emsp;</span>
                    <span>
                      {details.firstname.toUpperCase() +
                        " " +
                        details.lastname.toUpperCase()}
                    </span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <span>{OorF} Email id: &emsp;</span>
                    <span>{details.email.toLowerCase()}</span>
                  </Col>
                </Row>

                <br />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Base>
  );
}

export default ItemDetails;
