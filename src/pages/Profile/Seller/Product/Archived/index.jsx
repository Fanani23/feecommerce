import React, { useState, useEffect } from "react";
import style from "./seller-archived.module.css";
import assets from "../../../../../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerArchived = () => {
  const [data, setData] = useState(null);

  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("5");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data);
      console.log("Get product", res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `${process.env.REACT_APP_BUILD_API}/products/archive`;
    if (limit !== "5") {
      url = `${url}?limit=${limit}`;
    } else {
      url = `${url}?limit=5`;
    }
    if (search !== "") {
      url = `${url}&search=${search}`;
    }
    if (sortBy !== "name") {
      url = `${url}&sortBy=${sortBy}`;
    } else {
      url = `${url}&sortBy=name`;
    }
    if (sortOrder !== "DESC") {
      url = `${url}&sortOrder=${sortOrder}`;
    } else {
      url = `${url}&sortOrder=DESC`;
    }
    if (page !== "1") {
      url = `${url}&page=${page}`;
    }
    getData(url);
  }, [limit, search, sortBy, sortOrder, page]);

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
                <img
                  className={style.profileLeftImg}
                  src={assets.logoprofilenav}
                  alt=""
                />
                <div className="d-flex flex-column gap-1 align-items-center">
                  <div>
                    <p className={style.profileLeftName}>Johannes Michael</p>
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
                <button type="button" className={style.profileLeftButton}>
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
              <div className="d-flex flex-row gap-3 justify-content-end">
                <div>
                  <button type="button" className={style.addCategory}>
                    Category
                  </button>
                </div>
                <div>
                  <button type="button" className={style.addProduct}>
                    Product
                  </button>
                </div>
              </div>
              <div className="nav nav-tabs">
                <li className="nav-item">
                  <a href="/profile-seller/product" className="nav-link">
                    All items
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/profile-seller/sold-out" className="nav-link">
                    Sold out
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/profile-seller/archived"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Archived
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
                      <p>Product name</p>
                    </div>
                    <div className={style.categoryBase}>
                      <p>Category</p>
                    </div>
                    <div className={style.priceBase}>
                      <p>Price</p>
                    </div>
                    <div className={style.stockBase}>
                      <p>Stock</p>
                    </div>
                    <div className={style.actionBase}>
                      <p>Action</p>
                    </div>
                  </div>
                </div>
                {data ? (
                  data.map((item) => (
                    <>
                      <div className={style.productValueBase}>
                        <div className="d-flex flex-row justify-content-between">
                          <div className={style.productNameBase}>
                            <p className={style.productNameText}>{item.name}</p>
                          </div>
                          <div className={style.categoryBase}>
                            <p className={style.categoryText}>
                              {item.category}
                            </p>
                          </div>
                          <div className={style.priceBase}>
                            <p className={style.priceText}>Rp. {item.price}</p>
                          </div>
                          <div className={style.stockBase}>
                            <p className={style.stockText}>{item.stock}</p>
                          </div>
                          <div className={style.actionBaseValue}>
                            <div>
                              <button
                                type="button"
                                className={style.editProductButton}
                              >
                                Edit
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className={style.deleteProductButton}
                              >
                                Delete
                              </button>
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

export default SellerArchived;
