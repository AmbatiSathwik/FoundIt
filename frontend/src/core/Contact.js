import React from "react";
import Base from "./Base";
import Coder1 from "./coder.jpg";
import Coder2 from "./coder-2.jpg";
import Coder3 from "./coder-3.jpg";

function Contact() {
  return (
    <Base title="Contacts">
      <br />
      <br />
      <div className="row">
        <div className="col-4" align="center">
          <div className="card shadow">
            <img
              className="card-img-top img-thumbnail rounded"
              src={Coder1}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Vishnu</h5>
              <p className="card-text">CSE, Final year, NIT calicut</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Roll: B190429CS</li>
              <li className="list-group-item">Phone: 6309829376</li>
              <li className="list-group-item">
                vishnuvardhan_b190429cs@nitc.ac.in
              </li>
            </ul>
          </div>
        </div>
        <div className="col-4" align="center">
          <div className="card shadow">
          <img
              className="card-img-top img-thumbnail rounded"
              src={Coder2}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Ambati Sathwik</h5>
              <p className="card-text">CSE, Final year, NIT calicut</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Roll: B190500CS</li>
              <li className="list-group-item">Phone: 8688143191</li>
              <li className="list-group-item">ambatisathwil2311@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="col-4" align="center">
          <div className="card shadow">
          <img
              className="card-img-top img-thumbnail rounded"
              src={Coder3}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Venkata Akhil</h5>
              <p className="card-text">CSE, Final year, NIT calicut</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Roll: B190157CS</li>
              <li className="list-group-item">Phone: 9959607397</li>
              <li className="list-group-item">venkataakhil2002@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Contact;
