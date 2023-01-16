import React from "react";
import style from "./reset.module.css";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className={style.containerLogin}>
        <div className={style.containerForm}>
          <div>
            <img className={style.loginLogo} src={assets.logologin} alt="" />
          </div>
          <div>
            <p className={style.loginText}>Reset Password</p>
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
                />
              </div>
              <div>
                <p
                  type="button"
                  className={style.forgotText}
                  onClick={() => navigate("/login/customer")}
                >
                  Back to login
                </p>
              </div>
              <div>
                <button type="button" className={style.buttonLogin}>
                  Send OTP
                </button>
              </div>
            </form>
            <div className="d-flex flex-row gap-1">
              <p className={style.footTextLeft}>Already have OTP?</p>
              <p
                type="button"
                className={style.footTextRight}
                onClick={() => navigate("/verification")}
              >
                Input here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
