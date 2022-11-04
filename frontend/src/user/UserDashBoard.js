import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { userlostitems } from "../lostitems/helper/lostitemsapi";
import { userfounditems } from "../lostitems/helper/founditemsapi";
import ItemCard from "../lostitems/ItemCard";
import { userdetails } from "./helper/userapicalls";
import User from "./user-1.gif";
import { API } from "../backend";

function UserDashBoard() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    roll: "",
    email: "",
    error: "",
  });

  const [lost, setLost] = useState([]);
  const [found, setFound] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
    const id = localStorage.getItem("id").slice(1, -1);

    userdetails(id).then((data) => {
      setUser({
        ...user,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        roll: data.roll,
        email: data.email,
        error: "",
      });
    });

    userlostitems(id).then((data) => {
      setLost(data);
    });

    userfounditems(id).then((data) => {
      setFound(data);
    });
  }, []);

  const removeLostItem = (id) => {
    const temp = { id: id };
    const token = "Bearer " + localStorage.getItem("jwt").slice(1, -1);
    fetch(`${API}removelostItems`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(temp),
    }).then((res) => {
      window.location.reload(false);
    });
  };

  const removeFoundItem = (id) => {
    const temp = { id: id };
    const token = "Bearer " + localStorage.getItem("jwt").slice(1, -1);
    fetch(`${API}removefoundItems`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(temp),
    }).then((res) => {
      window.location.reload(false);
    });
  };

  return (
    <Base title="User Dashboard">
      <div>
        <h2>User Details</h2>
        <div className="userCard">
          <Row>
            <Col xs={3}>
              <img src={User} alt="User icon" />
            </Col>
            <Col xs={9}>
              <div className="userDetails">
                <br />
                <Row>
                  <Col>
                    <span>First Name: &emsp;</span>
                    <span>{user.firstname.toUpperCase()}</span>
                  </Col>
                  <Col>
                    <span>Last Name: &emsp;</span>
                    <span>{user.lastname.toUpperCase()}</span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <span>Roll Number: &emsp;</span>
                    <span>{user.roll.toUpperCase()}</span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <span>User Name: &emsp;</span>
                    <span>{user.username}</span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <span>Email: &emsp;</span>
                    <span>{user.email}</span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <span>Items Lost: &emsp;</span>
                    <span>{lost.length}</span>
                  </Col>
                  <Col>
                    <span>Items Found: &emsp;</span>
                    <span>{found.length}</span>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div>
        <br />
        <h2>My Lost items</h2>
        <br />

        <div className="itemcards">
          <Row>
            {lost.map((item) => {
              return (
                <Col xs={4} align="center">
                  <div className="itemcard">
                    <ItemCard
                      itemname={item.itemname}
                      details={item.details}
                      type={item.type}
                      date={item.date
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                      id={item._id}
                      status={"lost"}
                    />
                    <p
                      onClick={() => {
                        removeLostItem(item._id);
                      }}
                      className="text-danger pointer"
                    >
                      Remove Item
                    </p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <br />
      <div>
        <br />
        <h2>My Found items</h2>
        <br />
        <div className="itemcards">
          <Row>
            {found.map((item) => {
              return (
                <Col xs={4} align="center">
                  <div className="itemcard">
                    <ItemCard
                      itemname={item.itemname}
                      details={item.details}
                      type={item.type}
                      date={item.date
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                      id={item._id}
                      status={"found"}
                    />
                    <p
                      onClick={() => {
                        removeFoundItem(item._id);
                      }}
                      className="text-danger pointer"
                    >
                      Remove Item
                    </p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <br />
      <br />
    </Base>
  );
}

export default UserDashBoard;
