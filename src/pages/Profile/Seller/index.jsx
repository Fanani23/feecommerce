import React, { useEffect, useState } from "react";
import style from "./profile-seller.module.css";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileSeller = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

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

  useEffect(() => {
    let url = `${process.env.REACT_APP_BUILD_API}/users/profile`;
    getProfile(url);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("alamat", address);
      formData.append("photo", photo);
      await axios.put(
        `${process.env.REACT_APP_BUILD_API}/users/profile`,
        formData,
        auth,
        {
          "content-type": "multipart/form-data",
        }
      );
      console.log("Update profile success");
      Swal.fire("Success", "Update profile success", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Update profile failed", "error");
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
                <img src={assets.logobell} alt="" />
              </div>
              <div>
                <img src={assets.logomail} alt="" />
              </div>
              <div type="button" onClick={() => navigate("/profile-seller")}>
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
                {data.photo === null ? (
                  <img
                    className={style.profileLeftImg}
                    src={assets.logoprofilenav}
                    alt=""
                  />
                ) : (
                  <img
                    className={style.profileLeftImg}
                    src={data.photo}
                    alt=""
                  />
                )}
                <div className="d-flex flex-column gap-1 align-items-center">
                  <div>
                    <p className={style.profileLeftName}>{data.fullname}</p>
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
                <div
                  type="button"
                  className="d-flex flex-row gap-2"
                  onClick={() => navigate("/profile-seller/product")}
                >
                  <div>
                    <img
                      className={style.profilePackageImg}
                      src={assets.logopackage}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className={style.profilePackageText}>Product</p>
                  </div>
                </div>
                <div
                  type="button"
                  className="d-flex flex-row gap-2"
                  onClick={() => navigate("/profile-seller/order")}
                >
                  <div>
                    <img
                      className={style.profilePackageImg}
                      src={assets.logoorder}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className={style.profilePackageText}>Order</p>
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
                  <p className={style.profileRightTopText}>My profile store</p>
                </div>
                <div>
                  <p className={style.profileRightTopTextInfo}>
                    Manage your profile information
                  </p>
                </div>
              </div>
              <div>
                <img
                  className={style.lineProfileVertical}
                  src={assets.lineprofilehorizontal}
                  alt=""
                />
              </div>
              <div className="d-flex flex-row gap-5">
                <div className={style.profileBodyLeft}>
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <p className={style.storeName}>Fullname</p>
                    </div>
                    <div>
                      <p className={style.emailText}>Email</p>
                    </div>
                    <div>
                      <p className={style.phoneNumber}>Phone Number</p>
                    </div>
                    <div>
                      <p className={style.storeDescription}>
                        Store Description
                      </p>
                    </div>
                  </div>
                </div>
                <div className={style.profileBodyCenter}>
                  <form className="d-flex flex-column gap-3" action="">
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
                        name="phone"
                        id="phone"
                        placeholder="Phone number"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <textarea
                        name="alamat"
                        id="alamat"
                        cols="20"
                        rows="5"
                        placeholder="Address"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className={style.profileBodyCenterButton}
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <img src={assets.lineprofilevertical} alt="" />
                </div>
                <div className={style.profileBodyRight}>
                  <div className="d-flex flex-column gap-3">
                    <div>
                      {photo === null ? (
                        <img
                          className={style.profileBodyRightImg}
                          src={assets.logoprofilenav}
                          alt=""
                        />
                      ) : (
                        <img
                          className={style.profileBodyRightImg}
                          src={photo}
                          alt=""
                        />
                      )}
                    </div>
                    <div>
                      <button
                        className={style.profileBodyRightButton}
                        type="button"
                      >
                        <label type="button" htmlFor="photo">
                          Select Image
                        </label>
                      </button>
                      <input
                        type="file"
                        name="photo"
                        id="photo"
                        className={style.inputFile}
                        onChange={handlePhotoChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSeller;
