import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  addfoundchat,
  founditemdetails,
  getfoundchat,
} from "./helper/founditemsapi";
import {
  addlostchat,
  getlostchat,
  lostitemdetails,
} from "./helper/lostitemsapi";
import Lost from "./lostitem.jpg";

function ItemDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.slice(13, 37);
  const status = location.pathname.slice(38).toUpperCase();

  const [details, setDetails] = useState({
    itemname: "",
    type: "",
    date: "",
    details: "",
    firstname: "",
    lastname: "",
    email: "",
    sid: "",
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
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
          sid: res[1]._id,
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
          sid: res[1]._id,
        });
      });
    }
  }, []);

  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (details.sid) {
      if (status === "LOST") {
        const tid = localStorage.getItem("id").slice(1, -1);
        const temp = { fromsid: details.sid, tosid: tid, lid: id };
        getlostchat(temp).then((res) => {
          setChat(res);
        });
      } else {
        const tid = localStorage.getItem("id").slice(1, -1);
        const temp = { fromsid: details.sid, tosid: tid, fid: id };
        getfoundchat(temp).then((res) => {
          setChat(res);
        });
      }
    }
  }, [details.sid]);

  const OorF = status === "LOST" ? "Owner" : "Founder";

  const renderChat = (fromsid, message) => {
    if (details.sid === "") {
      return <h2>No Chat fetched yet</h2>;
    }
    return (
      <div className="chatcard">
        <Row>
          <Col xs={1}>
            <span>{fromsid === details.sid ? OorF : "You"}:&emsp;</span>
          </Col>
          <Col xs={11}>
            <span>{message}</span>
          </Col>
        </Row>
      </div>
    );
  };

  const [message, setMessage] = useState({
    msg: "",
  });

  const handleChange = (event) => {
    setMessage({ ...message, msg: event.target.value });
  };

  const sendChat = () => {
    if (status === "LOST") {
      const fromsid = localStorage.getItem("id").slice(1, -1);
      const temp = {
        fromsid: fromsid,
        tosid: details.sid,
        lid: id,
        message: message.msg,
      };
      addlostchat(temp)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      const fromsid = localStorage.getItem("id").slice(1, -1);
      const temp = {
        fromsid: fromsid,
        tosid: details.sid,
        fid: id,
        message: message.msg,
      };
      console.log(temp);
      addfoundchat(temp)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

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
        <br />
        <div>
          <h2 className="text-center">Send Message to {OorF}</h2>
          <div className="mx-5">
            <br />
            <textarea
              name="detail"
              className="details"
              type="text"
              placeholder={`Chat with ${OorF}`}
              onChange={handleChange}
            />
            <Button
              style={{
                "background-color": "#ed8181",
                "margin-left": "50px",
                "border-radius": "15px",
              }}
              onClick={sendChat}
            >
              Send
            </Button>
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-center">Previous chats</h2>
          {chat.map((c) => {
            return renderChat(c.fromsid, c.message);
          })}
        </div>
      </div>
    </Base>
  );
}

export default ItemDetails;
