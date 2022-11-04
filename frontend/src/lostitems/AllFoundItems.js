import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Base from "../core/Base";
import { allfounditems } from "./helper/founditemsapi";
import { Row,Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function AllFoundItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    allfounditems().then((res) => {
      setItems(res);
    });
  }, []);


  return (
    <Base title="Found Items">
        <br/>
      <Row>
        {items.map((item) => {
          return (
            <Col xs={4} align="center">
              <div className="itemcard" >
                <ItemCard
                  itemname={item.itemname}
                  details={item.details}
                  type={item.type}
                  date={item.date.slice(0, 10).split("-").reverse().join("-")}
                  id={item._id}
                  status={"found"}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </Base>
  );
}

export default AllFoundItems;
