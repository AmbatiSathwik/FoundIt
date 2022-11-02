import React from "react";
import "../styles.css";
import Base from "./Base";
import { Row, Col } from "react-bootstrap";
import Wallet from "./wallet.jpg";
import Lost from "./lost.jfif";
import Teddy from "./teddy.jfif";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Base title="">
      <div className="mt-5">
        <Link to="/ReportFound">
          <div className="homeCard">
            <Row>
              <Col xs={9}>
                <div className="homeCardText">
                  <h2>Found an Item</h2>
                  <br />
                  <p>If you found any item. Please report by clicking here.</p>
                </div>
              </Col>
              <Col xs={3}>
                <img width="250" height="180" src={Wallet} alt="wallet" />
              </Col>
            </Row>
          </div>
        </Link>

        <Link to="/ReportLost">
          <div className="homeCard hcreverse">
            <Row>
              <Col xs={9}>
                <div className="homeCardText">
                  <h2>Lost an Item</h2>
                  <br />
                  <p>If you lost an item. You can report it by clicking here</p>
                </div>
              </Col>
              <Col xs={3}>
                <img width="250" height="180" src={Lost} alt="Lost sign" />
              </Col>
            </Row>
          </div>
        </Link>

        <Link to="/foundItems">
          <div className="homeCard">
            <Row>
              <Col xs={9}>
                <div className="homeCardText">
                  <h2>Found Items Page</h2>
                  <br />
                  <p>
                    If you lost any item, you can check found items page <br />{" "}
                    and check whether your item present there.
                  </p>
                </div>
              </Col>
              <Col xs={3}>
                <img width="250" height="180" src={Teddy} alt="Lost property" />
              </Col>
            </Row>
          </div>
        </Link>
      </div>
    </Base>
  );
}

export default Home;
