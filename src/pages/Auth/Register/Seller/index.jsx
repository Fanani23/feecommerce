import React, { useState } from "react";
import style from "./register-seller.module.css";
import assets from "../../../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerSeller } from "../../../../configs/redux/actions/Register/Seller";

const RegisterSeller = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(fullname);
    console.log(email);
    console.log(role);
    console.log(password);
    let data = {
      fullname,
      email,
      role,
      password,
    };
    dispatch(registerSeller(data, navigate));
  };

  return (
    <div className="container-fluid">
      <div className={style.containerLogin}>
        <div className={style.containerForm}>
          <div>
            <img className={style.loginLogo} src={assets.logologin} alt="" />
          </div>
          <div>
            <p className={style.loginText}>Please register with your account</p>
          </div>
          <div className={style.loginButtonGroup}>
            <div>
              <button
                type="button"
                className={style.loginButtonCustomer}
                onClick={() => navigate("/register/customer")}
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
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Fullname"
                  className="form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
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
                  name="role"
                  id="role"
                  placeholder="Role"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
                <button
                  type="button"
                  className={style.buttonLogin}
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </form>
            <div className="d-flex flex-row gap-1">
              <p className={style.footTextLeft}>Already have account?</p>
              <p
                type="button"
                className={style.footTextRight}
                onClick={() => navigate("/login/seller")}
              >
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;
