import React, { useState, useEffect } from "react";
import style from "./payment.module.css";
import assets from "../../assets";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getProfile = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data);
      console.log(res.data.data);
      setFullname(res.data.data.fullname);
      setEmail(res.data.data.email);
      setPhone(res.data.data.phone);
      setAddress(res.data.data.alamat);
      setPhoto(res.data.data.photo);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrder = async (url2) => {
    try {
      const res = await axios.get(url2, auth);
      setOrder(res.data.data[0]);
      console.log(res.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3011/users/profile`;
    let url2 = `http://localhost:3011/order/detail/${id}`;
    getProfile(url);
    getOrder(url2);
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3011/order/status/${id}`, auth);
      Swal.fire("Success", "Payment success", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Payment failed", "error");
    }
  };

  return (
    <div className="container-fluid">
      <div className={style.containerNavbar}>
        <div className={style.containerNavbarBody}>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <img src={assets.logonavbar} alt="" />
            </div>
            <div className={style.containerNavbarInfo}>
              <div>
                <img src={assets.logocart} alt="" />
              </div>
              <div>
                <img src={assets.logobell} alt="" />
              </div>
              <div>
                <img src={assets.logomail} alt="" />
              </div>
              <div type="button" onClick={() => navigate("/customer-profile")}>
                <img src={assets.logoprofilenav} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerBody}>
        <div className={style.containerBodyBase}>
          <div className={style.containerBodyLeft}>
            <div className="d-flex flex-column gap-4">
              <div>
                <p className={style.cartTitleText}>Payment</p>
              </div>
              <div>
                <div className={style.cartBodyLeft}>
                  <div className={style.cartBodyLeftValue}>
                    <div className="d-flex flex-column gap-4">
                      <div className="d-flex flex-row justify-content-between mt-2">
                        <label for="gopay">Gopay</label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id="gopay"
                          value="Gopay"
                        />
                      </div>
                      <div className="d-flex flex-row justify-content-between mt-2">
                        <label for="pos">Pos Indonesia</label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id="pos"
                          value="Pos Indonesia"
                        />
                      </div>
                      <div className="d-flex flex-row justify-content-between mt-2">
                        <label for="mastercard">Mastercard</label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id="mastercard"
                          value="Mastercard"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.containerBodyRight}>
            <div className={style.containerBodyRightValue}>
              <div className="d-flex flex-column gap-3">
                <div className="mt-3">
                  <p className={style.summaryText}>Shopping summary</p>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <p className={style.totalText}>Total</p>
                  </div>
                  <div>
                    <p className={style.totalValue}>$ {order.total}</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={style.cartButton}
                    onClick={handlePayment}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
