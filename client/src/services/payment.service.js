import axios from "axios";
import baseUrl from "../api/api";

const handlePayment = async (values) => {
  return await axios
    .post(`${baseUrl}/payment`, values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export { handlePayment };
