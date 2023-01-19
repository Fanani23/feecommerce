import React, { useState, useEffect } from "react";
import style from "./cart.module.css";
import assets from "../../../../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CustomerCart = () => {
  const [qty, setQty] = useState(1);
  const [data, setData] = useState([]);
  const [grand, setGrand] = useState("");
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [id_order, setId_order] = useState("");

  const navigate = useNavigate();

  const plusTotal = () => setQty(qty + 1);
  const minusTotal = () => setQty(qty - 1);

  let token = localStorage.getItem("token");
  let id_user = localStorage.getItem("id");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getCart = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data);
      console.log("Get user", res.data.data);
      setId(res.data.data[0].id_product);
      setAmount(res.data.data[0].amount);
      setId_order(res.data.data[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `${process.env.REACT_APP_BUILD_API}/bag`;
    getCart(url);
  }, []);

  useEffect(() => {
    let total = 0;
    data.map((item) => (total = total + item.price * item.amount));
    setGrand(total);
  });

  const handleOrder = async (e) => {
    e.preventDefault();
    let data = {
      id_product: id,
      amount: amount,
      total: grand,
    };
    try {
      await axios.post(`${process.env.REACT_APP_BUILD_API}/order`, data, auth);
      await axios.delete(
        `${process.env.REACT_APP_BUILD_API}/bag/delete/${id_order}`,
        auth
      );
      Swal.fire("Success", "Create order success", "success");
      navigate("/profile-customer/history");
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Create order failed", "error");
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
              <div>
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
                <p className={style.cartTitleText}>My Bag</p>
              </div>
              <div>
                <div className={style.cartBodyLeft}>
                  {data ? (
                    data.map((item) => (
                      <div className={style.cartBodyLeftValue}>
                        <div>
                          <div className="pt-3 pb-3">
                            <img
                              className={style.productImg}
                              src={item.photo}
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <p className={style.productName}>
                            {item.product_name}
                          </p>
                        </div>
                        <div className={style.totalButtonBase}>
                          <div className="d-flex flex-row gap-2">
                            <div type="button" onClick={minusTotal}>
                              <img
                                className={style.logoMinus}
                                src={assets.logominus}
                                alt=""
                              />
                            </div>
                            <p className={style.productTotalText}>{qty}</p>
                            <div type="button" onClick={plusTotal}>
                              <img
                                className={style.logoPlus}
                                src={assets.logoplus}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className={style.productPrice}>$ {item.price}</p>
                        </div>
                        <div>
                          <p type="button" className={style.productAction}>
                            Delete
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
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
                    <p className={style.totalValue}>$ {grand}</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={style.cartButton}
                    onClick={handleOrder}
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

export default CustomerCart;
