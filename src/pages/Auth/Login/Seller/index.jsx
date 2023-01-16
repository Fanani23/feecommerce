import React, { useState } from "react";
import style from "./login-seller.module.css";
import assets from "../../../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSeller } from "../../../../configs/redux/actions/Login/Seller";

const LoginSeller = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    let data = {
      email,
      password,
    };
    dispatch(loginSeller(data, navigate));
  };

  return (
    <div className="container-fluid">
      <div className={style.containerLogin}>
        <div className={style.containerForm}>
          <div>
            <img className={style.loginLogo} src={assets.logologin} alt="" />
          </div>
          <div>
            <p className={style.loginText}>Please login with your account</p>
          </div>
          <div className={style.loginButtonGroup}>
            <div>
              <button
                type="button"
                className={style.loginButtonCustomer}
                onClick={() => navigate("/login/customer")}
              >
                Customer
              </button>
            </div>
            <div>
              <button type="button" className={style.loginButtonSeller}>
                Seller
              </button>
            </div>
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
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <p
                  type="button"
                  className={style.forgotText}
                  onClick={() => navigate("/reset")}
                >
                  Forgot password?
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className={style.buttonLogin}
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="d-flex flex-row gap-1">
              <p className={style.footTextLeft}>Don't have account?</p>
              <p
                type="button"
                className={style.footTextRight}
                onClick={() => navigate("/register/seller")}
              >
                Register
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSeller;
