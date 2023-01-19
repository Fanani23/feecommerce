import axios from "axios";
import Swal from "sweetalert2";

export const loginCustomer = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "CUSTOMER_LOGIN_PENDING" });
    const res = await axios.post(
      `${process.env.REACT_APP_BUILD_API}/users/login`,
      data
    );
    const customer = res.data.data;
    localStorage.setItem("token", customer.token);
    localStorage.setItem("id", customer.id);
    localStorage.setItem("role", customer.role);
    dispatch({ type: "CUSTOMER_LOGIN_SUCCESS", payload: customer });
    Swal.fire("Success", "Login customer success", "success");
    navigate("/home");
  } catch (err) {
    console.log(err);
    Swal.fire("Failed", "Login customer failed", "error");
  }
};
