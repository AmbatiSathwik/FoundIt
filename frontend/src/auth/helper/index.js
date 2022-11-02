import { API } from "../../backend";

export const signup = (user) => {
  return fetch(`${API}register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const signin = (user) => {
  return fetch(`${API}login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data.jwttoken));
    localStorage.setItem("id", JSON.stringify(data._id));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("_id");
    next();
    return fetch(`${API}signout`, {
      method: "GET",
    })
      .then((res) => {
        console.log("signout successfull ",res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false
        
    }
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }
}
