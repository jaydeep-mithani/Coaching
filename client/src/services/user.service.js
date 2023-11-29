import axios from "axios";
import baseUrl from "../api/api";

export const getuserById = async (userId) => {
  return await axios
    .get(`${baseUrl}/users/${userId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
