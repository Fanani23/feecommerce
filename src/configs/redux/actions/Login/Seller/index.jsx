import axios from "axios";
import Swal from "sweetalert2";

export const loginSeller = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "SELLER_LOGIN_PENDING" });
    const res = await axios.post(
      `${process.env.REACT_APP_BUILD_API}/users/login`,
      data
    );
    const seller = res.data.data;
    const token = seller.token;
    const id = seller.id;
    const role = seller.role;
    console.log(token);
    console.log(id);
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("role", role);
    dispatch({ type: "SELLER_LOGIN_SUCCESS", payload: seller });
    Swal.fire("Success", "Login seller success", "success");
    navigate("/home");
  } catch (err) {
    console.log(err);
    Swal.fire("Failed", "Login seller failed", "error");
  }
};
