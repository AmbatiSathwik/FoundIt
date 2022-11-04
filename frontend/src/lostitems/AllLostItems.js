import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Base from "../core/Base";
import { alllostitems } from "./helper/lostitemsapi";
import { Row, Col } from "react-bootstrap";

function AllLostItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    alllostitems().then((res) => {
      setItems(res);
    });
  }, []);

  return (
    <Base title="Lost Items">
      <br />
      <div className="itemcards">
        <Row>
          {items.map((item) => {
            return (
              <Col xs={4} align="center">
                <div className="itemcard">
                  <ItemCard
                    itemname={item.itemname}
                    details={item.details}
                    type={item.type}
                    date={item.date.slice(0, 10).split("-").reverse().join("-")}
                    id={item._id}
                    status={"lost"}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Base>
  );
}

export default AllLostItems;
