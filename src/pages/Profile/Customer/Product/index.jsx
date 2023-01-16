import React, { useState, useEffect } from "react";
import style from "./customer-product.module.css";
import assets from "../../../../assets";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CustomerProduct = () => {
  const [qty, setQty] = useState(1);

  const { id } = useParams();

  const plusTotal = () => setQty(qty + 1);
  const minusTotal = () => setQty(qty - 1);

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
  let id_user = localStorage.getItem("id");

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
      setProduct(res.data.data[0]);
      console.log("Get product", res.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3011/users/profile`;
    let url2 = `http://localhost:3011/products/detail/${id}`;
    getProfile(url);
    getProduct(url2);
  }, [limit, search, sortBy, sortOrder, page]);

  const handleCreateBag = async (e) => {
    e.preventDefault();
    let data = {
      id_product: id,
      amount: qty,
    };
    try {
      await axios.post(`http://localhost:3011/bag/`, data, auth);
      Swal.fire("Success", "Success add to bag", "success");
      navigate(`/cart`);
    } catch (err) {
      Swal.fire("Warning", "Failed add to bag", "error");
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
          <div className={style.containerBodyValue}>
            <div className="d-flex flex-row justify-content-between">
              <div className={style.containerBVTopLeft}>
                <div>
                  <img
                    className={style.photoDetailProduct}
                    src={product.photo}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.containerBVTopRight}>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <p className={style.productNameText}>{product.name}</p>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <div>
                      <p className={style.productPriceBase}>Price</p>
                    </div>
                    <div>
                      <p className={style.productPriceText}>
                        $ {product.price}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <div>
                      <p className={style.productPriceBase}>Total</p>
                    </div>
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
                    <button
                      type="button"
                      className={style.productBagButton}
                      onClick={handleCreateBag}
                    >
                      Add to Bag
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className={style.productBuyButton}
                      onClick={handleCreateBag}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-felx flex-column gap-4">
              <div>
                <p className={style.productInformation}>Product Information</p>
              </div>
              <div className="d-flex flex-column gap-1">
                <div>
                  <p className={style.productDescriptionBase}>Description</p>
                </div>
                <div>
                  <p className={style.productDescriptionText}>
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProduct;
