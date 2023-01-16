import axios from "axios";
import Swal from "sweetalert2";

export const registerCustomer = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "CUSTOMER_REGISTER_PENDING" });
    const res = await axios.post(`http://localhost:3011/users/register`, data);
    const customer = res.data.data;
    dispatch({ type: "CUSTOMER_REGISTER_SUCCESS", payload: customer });
    Swal.fire("Success", "Register customer success", "success");
    navigate("/verification");
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Register customer failed", "error");
  }
};
