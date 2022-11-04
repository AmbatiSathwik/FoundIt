import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { API } from "../../backend";

export const reportlost = (item) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const token = "Bearer " + localStorage.getItem("jwt").slice(1, -1);

  return fetch(`${API}addlostItems`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const alllostitems = () => {
  return fetch(`${API}alllostitems`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const userlostitems = (id) => {
  const temp = { id: id };
  return fetch(`${API}getuserlostitems`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(temp),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const lostitemdetails = (id) => {
  const temp = { id: id };
  return fetch(`${API}lostitemdetails`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(temp),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};
