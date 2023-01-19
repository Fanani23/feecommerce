import React, { useState, useEffect } from "react";
import style from "./seller-order.module.css";
import assets from "../../../../assets";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const SellerOrder = () => {
  const [data, setData] = useState(null);
  const [order, setOrder] = useState([]);

  const [modalDetail, setModalDetail] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);

  const closeModalDetail = () => setModalDetail(false);
  const openModalDetail = () => setModalDetail(true);

  const closeModalStatus = () => setModalStatus(false);
  const openModalStatus = () => setModalStatus(true);

  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);

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
      setOrder(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `${process.env.REACT_APP_BUILD_API}/users/profile`;
    let url2 = `${process.env.REACT_APP_BUILD_API}/order/seller`;
    getProfile(url);
    getOrder(url2);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const updateStatus = async (id) => {
    await axios.put(`${process.env.REACT_APP_BUILD_API}/order/status/${id}`);
    Swal.fire("Sucess", "Success", "success");
    getOrder();
  };

  const modalStyles = {
    content: {
      width: "465px",
      height: "605px",
      top: "25%",
      left: "40%",
      right: "auto",
      bottom: "auto",
      marginRight: "-20%",
      transform: "translate(-20%, -20%)",
    },
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
        <div className={style.containerBodyLeft}>
          <div className={style.containerBLBody}>
            <div className={style.containerBLBValue}>
              <div className="d-flex flex-row gap-2">
                <img className={style.profileLeftImg} src={photo} alt="" />
                <div className="d-flex flex-column gap-1 align-items-center">
                  <div>
                    <p className={style.profileLeftName}>{fullname}</p>
                  </div>
                  <div>
                    <img
                      className={style.profileLeftEdit}
                      src={assets.logoedit}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className={style.profileLeftVal}>
                <div type="button" className="d-flex flex-row gap-2">
                  <div>
                    <img
                      className={style.profilePackageImg}
                      src={assets.logopackage}
                      alt=""
                    />
                  </div>
                  <div>
                    <p
                      type="button"
                      className={style.profilePackageText}
                      onClick={() => navigate("/profile-seller/product")}
                    >
                      Product
                    </p>
                  </div>
                </div>
                <div type="button" className="d-flex flex-row gap-2">
                  <div>
                    <img
                      className={style.profilePackageImg}
                      src={assets.logoorder}
                      alt=""
                    />
                  </div>
                  <div>
                    <p
                      type="button"
                      className={style.profilePackageText}
                      onClick={() => navigate("/profile-seller/order")}
                    >
                      Order
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className={style.profileLeftButton}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.containerBodyRight}>
          <div className={style.containerBRBody}>
            <div className={style.containerBRBValue}>
              <div className="d-flex flex-column gap-1">
                <div className="mt-3">
                  <p className={style.profileRightTopText}>My product</p>
                </div>
              </div>
              <div className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    href="/profile-seller/order"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Active
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/profile-seller/delivered" className="nav-link">
                    Delivered
                  </a>
                </li>
              </div>
              <div>
                <div className={style.productSearch}>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search"
                    className="form-control"
                  />
                </div>
              </div>
              <div className={style.productBody}>
                <div className={style.productBodyNavbar}>
                  <div className={style.productBodyNavbarValue}>
                    <div className={style.productNameBase}>
                      <p>Order</p>
                    </div>
                    <div className={style.categoryBase}>
                      <p>Status</p>
                    </div>
                    <div className={style.priceBase}>
                      <p>Price</p>
                    </div>
                    <div className={style.actionBase}>
                      <p>Action</p>
                    </div>
                  </div>
                </div>
                {order ? (
                  order.map((item) => (
                    <>
                      <div className={style.productValueBase}>
                        <div className="d-flex flex-row justify-content-between">
                          <div className={style.productNameBase}>
                            <p className={style.productNameText}>
                              {item.product_name}
                            </p>
                          </div>
                          <div className={style.categoryBase}>
                            <p className={style.categoryText}>
                              {item.category}
                            </p>
                          </div>
                          <div className={style.priceBase}>
                            <p className={style.priceText}>Rp. {item.price}</p>
                          </div>
                          <div>
                            {item.status === 0 ? (
                              <Button
                                as={Link}
                                to={`/checkout/${item.id}`}
                                variant="primary"
                                size="sm"
                                className="me-2"
                              >
                                Waiting
                              </Button>
                            ) : item.status === 1 ? (
                              <button
                                className="btn btn-primary"
                                onClick={() => updateStatus(item.id)}
                              >
                                Accept
                              </button>
                            ) : item.status === 2 ? (
                              <button
                                onClick={() => updateStatus(item.id)}
                                className="btn btn-primary"
                              >
                                Shipped
                              </button>
                            ) : (
                              <button className="btn btn-primary">
                                Delivered
                              </button>
                            )}
                          </div>
                          <div className={style.actionBaseValue}>
                            <div>
                              <button
                                type="button"
                                className={style.editProductButton}
                                onClick={openModalDetail}
                              >
                                Detail
                              </button>
                              <Modal
                                isOpen={modalDetail}
                                onRequestClose={closeModalDetail}
                                style={modalStyles}
                              >
                                <div className={style.modalBase}>
                                  <div className="d-flex flex-row justify-content-between">
                                    <div>
                                      <p className={style.modalBaseText}>
                                        Detail Order
                                      </p>
                                    </div>
                                    <div
                                      type="button"
                                      onClick={closeModalDetail}
                                    >
                                      <img src={assets.logomodalx} alt="" />
                                    </div>
                                  </div>
                                  <div>
                                    <form className={style.modalForm} action="">
                                      <div>
                                        <input
                                          type="text"
                                          name="name"
                                          id="name"
                                          placeholder="Product name"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="category"
                                          id="category"
                                          placeholder="Category"
                                          className="form-control"
                                        />
                                      </div>

                                      <div>
                                        <input
                                          type="text"
                                          name="qty"
                                          id="qty"
                                          placeholder="Qty"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="price"
                                          id="price"
                                          placeholder="Price"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="total"
                                          id="total"
                                          placeholder="Total"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="status"
                                          id="status"
                                          placeholder="Status"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="customer"
                                          id="customer"
                                          placeholder="Customer"
                                          className="form-control"
                                        />
                                      </div>
                                      <div className="mt-4">
                                        <button
                                          type="button"
                                          className={style.modalAddButton}
                                        >
                                          Detail Order
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </Modal>
                            </div>
                            <div>
                              <button
                                type="button"
                                className={style.deleteProductButton}
                                onClick={openModalStatus}
                              >
                                Status
                              </button>
                              <Modal
                                isOpen={modalStatus}
                                onRequestClose={closeModalStatus}
                                style={modalStyles}
                              >
                                <div className={style.modalBase}>
                                  <div className="d-flex flex-row justify-content-between">
                                    <div>
                                      <p className={style.modalBaseText}>
                                        Detail Order
                                      </p>
                                    </div>
                                    <div
                                      type="button"
                                      onClick={closeModalStatus}
                                    >
                                      <img src={assets.logomodalx} alt="" />
                                    </div>
                                  </div>
                                  <div>
                                    <form className={style.modalForm} action="">
                                      <div>
                                        <input
                                          type="text"
                                          name="name"
                                          id="name"
                                          placeholder="Product name"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="category"
                                          id="category"
                                          placeholder="Category"
                                          className="form-control"
                                        />
                                      </div>

                                      <div>
                                        <input
                                          type="text"
                                          name="qty"
                                          id="qty"
                                          placeholder="Qty"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="price"
                                          id="price"
                                          placeholder="Price"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="total"
                                          id="total"
                                          placeholder="Total"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="status"
                                          id="status"
                                          placeholder="Status"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          name="customer"
                                          id="customer"
                                          placeholder="Customer"
                                          className="form-control"
                                        />
                                      </div>
                                      <div className="mt-4">
                                        <button
                                          type="button"
                                          className={style.modalAddButton}
                                        >
                                          Change Status to Delivery
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </Modal>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <>
                    <div className={style.logoNoProduct}>
                      <img src={assets.logonoproduct} alt="" />
                    </div>
                    <div className={style.addProductNPBase}>
                      <button
                        type="button"
                        className={style.addProductNoProduct}
                      >
                        Add Product
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrder;
