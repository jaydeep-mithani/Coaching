import axios from "axios";
import baseUrl from "../api/api";

const contact = (values) => {
  return axios
    .post(`${baseUrl}/contact-us`, values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const freeMeditation = (values) => {
  return axios
    .post(`${baseUrl}/contact-us/free-meditation`, values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export { contact, freeMeditation };
