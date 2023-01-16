import React, { useState } from "react";
import style from "./verification.module.css";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verificationAccount } from "../../../configs/redux/actions/Verification";

const Verification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerification = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(otp);
    let data = {
      email,
      otp,
    };
    dispatch(verificationAccount(data, navigate));
  };

  return (
    <div className="container-fluid">
      <div className={style.containerLogin}>
        <div className={style.containerForm}>
          <div>
            <img className={style.loginLogo} src={assets.logologin} alt="" />
          </div>
          <div>
            <p className={style.loginText}>OTP</p>
          </div>
          <div>
            <form className={style.formInput} action="">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="OTP"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="button"
                  className={style.buttonLogin}
                  onClick={handleVerification}
                >
                  Confirm OTP
                </button>
              </div>
            </form>
            <div className="d-flex flex-row gap-1">
              <p className={style.footTextLeft}>Already confirm?</p>
              <p
                type="button"
                className={style.footTextRight}
                onClick={() => navigate("/login/customer")}
              >
                Back to login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
