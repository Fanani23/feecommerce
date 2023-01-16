import axios from "axios";
import Swal from "sweetalert2";

export const registerSeller = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "SELLER_REGISTER_PENDING" });
    const res = await axios.post(`http://localhost:3011/users/register`, data);
    const seller = res.data.data;
    dispatch({ type: "SELLER_REGISTER_SUCCESS", payload: seller });
    Swal.fire("Success", "Register seller success", "success");
    navigate("/verification");
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Register seller failed", "error");
  }
};
