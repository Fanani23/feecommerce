import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import assets from "../../assets";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
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
    let url = `${process.env.REACT_APP_BUILD_API}/users/profile`;
    let url2 = `${process.env.REACT_APP_BUILD_API}/products`;
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

  const responsiveTopCarousel = {
    dekstop: {
      breakpoint: { max: 2566, min: 1366 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsiveBotCarousel = {
    dekstop: {
      breakpoint: { max: 2566, min: 1366 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
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
            <div className="d-flex flex-row gap-1">
              <div className={style.searchNavbar}>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  className="form-control"
                />
              </div>
              <div type="button">
                <img
                  className={style.logoFilterNav}
                  src={assets.logofilter}
                  alt=""
                />
              </div>
            </div>
            <div className={style.containerNavbarInfo}>
              <div type="button">
                <img src={assets.logocart} alt="" />
              </div>
              <div>
                <button
                  type="button"
                  className={style.navLoginButton}
                  onClick={() => navigate("/login/customer")}
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className={style.navSignButton}
                  onClick={() => navigate("/register/customer")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerBody}>
        <div className={style.containerBodyBase}>
          <div className={style.containerBodyValue}>
            <div>
              <div className={style.carousel1TopBase}>
                <Carousel
                  className={style.carouselTop}
                  responsive={responsiveTopCarousel}
                  arrows={true}
                  showDots={true}
                  autoPlay={true}
                >
                  <div>
                    <img src={assets.carousel1} alt="carousel 1" />
                  </div>
                  <div>
                    <img src={assets.carousel2} alt="carousel 2" />
                  </div>
                  <div>
                    <img src={assets.carousel1} alt="carousel 3" />
                  </div>
                  <div>
                    <img src={assets.carousel2} alt="carousel 4" />
                  </div>
                </Carousel>
              </div>
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

export default Home;
