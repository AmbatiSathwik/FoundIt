import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Lost from "./lostitem.jpg";

function ItemCard({ itemname, details, type, date, id, status }) {
  const navigate = useNavigate();
  const toItemPage = () => {
    navigate("/itemdetails/" + id + "/" + status);
  };

  return (
    <div key={id} onClick={toItemPage}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={Lost} />
        <Card.Body>
          <Card.Title className="text-center">
            {itemname.toUpperCase()}
          </Card.Title>
          <Card.Text>{details}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Type : {type}</ListGroup.Item>
          <ListGroup.Item>Lost Date : {date}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default ItemCard;
