import axios from "axios";
import Swal from "sweetalert2";

export const verificationAccount = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "VERIFICATION_PENDING" });
    const res = await axios.post(
      `http://localhost:3011/users/verification`,
      data
    );
    const otp = res.data.data;
    dispatch({ type: "VERIFICATION_SUCCESS", payload: otp });
    Swal.fire("Success", "Verification account success", "success");
    navigate("/home");
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Verification account failed", "error");
  }
};
