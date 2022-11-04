import { API } from "../../backend";

export const userdetails = (id) => {
  const temp = { id: id };
  return fetch(`${API}userdetails`, {
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
