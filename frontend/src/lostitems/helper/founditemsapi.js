import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { API } from "../../backend";

export const reportfound = (item) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const token = "Bearer " + localStorage.getItem("jwt").slice(1, -1);
  console.log(token);

  return fetch(`${API}addfoundItems`, {
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

export const allfounditems = (next) => {
  return fetch(`${API}allfounditems`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const userfounditems = (id) => {
  const temp = { id: id };
  return fetch(`${API}getuserfounditems`, {
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

export const founditemdetails = (id) => {
  const temp = { id: id };
  return fetch(`${API}founditemdetails`, {
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

export const getfoundchat = (chat) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  const token = "Bearer " + localStorage.getItem("jwt").slice(1, -1);
  return fetch(`${API}getfoundchat`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(chat),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const addfoundchat = (chat) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  const token = "Bearer " + localStorage.getItem("jwt").slice(1, -1);
  return fetch(`${API}addfoundchat`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(chat),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};
