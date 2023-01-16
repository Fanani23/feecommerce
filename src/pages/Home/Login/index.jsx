import React, { useState, useEffect } from "react";
import style from "./home-login.module.css";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [product, setProduct] = useState([]);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("5");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState("");

  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getProfile = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data);
      console.log("Get user", res.data.data);
      setFullname(res.data.data.fullname);
      setEmail(res.data.data.email);
      setPhone(res.data.data.phone);
      setAddress(res.data.data.alamat);
      setImage(res.data.data.photo);
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async (url2) => {
    try {
      const res = await axios.get(url2, auth);
      setProduct(res.data.data);
      console.log("Get product", res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3011/users/profile`;
    let url2 = `http://localhost:3011/products`;
    if (limit !== "5") {
      url2 = `${url2}?limit=${limit}`;
    } else {
      url2 = `${url2}?limit=5`;
    }
    if (search !== "") {
      url2 = `${url2}&search=${search}`;
    }
    if (sortBy !== "name") {
      url2 = `${url2}&sortBy=${sortBy}`;
    } else {
      url2 = `${url2}&sortBy=name`;
    }
    if (sortOrder !== "DESC") {
      url2 = `${url2}&sortOrder=${sortOrder}`;
    } else {
      url2 = `${url2}&sortOrder=DESC`;
    }
    if (page !== "1") {
      url2 = `${url2}&page=${page}`;
    }
    getProfile(url);
    getProduct(url2);
  }, [limit, search, sortBy, sortOrder, page]);

  const handleToProfile = () => {
    if (role === "Seller") {
      navigate("/profile-seller");
    } else if (role === "Customer") {
      navigate("/profile-customer");
    }
  };

  return (
    <div className="container-fluid">
      <div className={style.containerNavbar}>
        <div className={style.containerNavbarBody}>
          <div className="d-flex flex-row justify-content-between">
            <div type="button" onClick={() => navigate("/home")}>
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
              <div type="button" onClick={handleToProfile}>
                <img src={assets.logoprofilenav} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerBody}>
        <div className={style.containerBodyBase}>
          <div className={style.containerBodyValue}>
            <div>
              {/* <Carousel
                className={style.carouselTop}
                responsive={responsiveTopCarousel}
                arrows={true}
                showDots={true}
                autoPlay={true}
              >
                <div>
                  <img src={assets.logocarouseltop1} alt="carousel 1" />
                </div>
                <div>
                  <img src={assets.logocarouseltop2} alt="carousel 2" />
                </div>
              </Carousel> */}
              <div>
                <div className="d-flex flex-column gap-1">
                  <div>
                    <p className={style.homeCategoryText}>Category</p>
                  </div>
                  <div>
                    <p className={style.homCategoryInfo}>
                      What are you currently looking for
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex flex-column gap-1">
                  <div>
                    <p className={style.homeNewText}>New</p>
                  </div>
                  <div>
                    <p className={style.homNewInfo}>
                      You’ve never seen it before!
                    </p>
                  </div>
                </div>
              </div>
              <div className={style.containerHomeProduct}>
                <div className={style.containerHomeProductBase}>
                  {product ? (
                    product.map((item) => (
                      <div
                        type="button"
                        className={style.cardProduct}
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <div>
                          <img
                            className={style.logoProductHome}
                            src={item.photo}
                            alt=""
                          />
                        </div>
                        <div>
                          <p className={style.productHomeName}>{item.name}</p>
                        </div>
                        <div>
                          <p className={style.productHomePrice}>
                            $ {item.price}
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
        </div>
      </div>
    </div>
  );
};

export default HomeLogin;
