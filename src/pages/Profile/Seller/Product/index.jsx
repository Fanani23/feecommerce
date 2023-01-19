import React, { useState, useEffect } from "react";
import style from "./seller-product.module.css";
import assets from "../../../../assets";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";

const SellerProduct = () => {
  const [data, setData] = useState(null);
  const [product, setProduct] = useState([]);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [id_toko, setId_toko] = useState("");

  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("5");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState("");

  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("photo", photo);
      formData.append("id_toko", id);
      await axios.post(
        `${process.env.REACT_APP_BUILD_API}/products`,
        formData,
        auth,
        {
          "content-type": "multipart/form-data",
        }
      );
      console.log("Update profile success");
      Swal.fire("Success", "Create product success", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Create product failed", "error");
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BUILD_API}/products/archive/${id}`
      );
      Swal.fire("Success", "Delete product success", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Delete product failed", "error");
    }
  };

  const navigate = useNavigate();

  const [modalProduct, setModalProduct] = useState(false);
  const [modalCategory, setModalCategory] = useState(false);
  const [modalEditProduct, setModalEditProduct] = useState({
    status: false,
    item_id: null,
  });
  const [modalEditCategory, setModalEditCategory] = useState(false);

  const closeModalProduct = () => setModalProduct(false);
  const openModalProduct = () => setModalProduct(true);

  const closeModalEditProduct = () =>
    setModalEditProduct({
      status: false,
      item_id: null,
    });
  const openModalEditProduct = (item_id) => {
    setModalEditProduct({
      status: true,
      item_id,
    });
  };

  const closeModalCategory = () => setModalCategory(false);
  const openModalCategory = () => setModalCategory(true);

  const closeModalEditCategory = () => setModalEditCategory(false);
  const openModalEditCategory = () => setModalEditCategory(true);

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
                {image === null ? (
                  <img
                    className={style.profileLeftImg}
                    src={assets.logoprofilenav}
                    alt=""
                  />
                ) : (
                  <img className={style.profileLeftImg} src={image} alt="" />
                )}
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
                  <button
                    type="button"
                    className={style.addCategory}
                    onClick={openModalCategory}
                  >
                    Category
                  </button>
                  <Modal
                    isOpen={modalCategory}
                    onRequestClose={closeModalCategory}
                    style={modalStyles}
                  >
                    <div className={style.modalBase}>
                      <div className="d-flex flex-row justify-content-between">
                        <div>
                          <p className={style.modalBaseText}>Add Category</p>
                        </div>
                        <div type="button" onClick={closeModalCategory}>
                          <img src={assets.logomodalx} alt="" />
                        </div>
                      </div>
                      <div>
                        <form className={style.modalForm} action="">
                          <div className="d-flex flex-row gap-3 justify-content-between">
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Product name"
                                className="form-control"
                              />
                            </div>
                            <div className="">
                              <button
                                type="button"
                                className={style.modalAddCategoryButton}
                              >
                                Add Category
                              </button>
                            </div>
                          </div>
                        </form>
                        <div className={style.modalCategoryValue}>
                          <div className={style.modalCVValue}>
                            <div className="d-flex flex-row gap-2">
                              <div>
                                <p>1</p>
                              </div>
                              <div>
                                <p>Category name</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <button
                                  className={style.modalCategoryEdit}
                                  type="button"
                                  onClick={openModalEditCategory}
                                >
                                  Edit
                                </button>
                                <Modal
                                  isOpen={modalEditCategory}
                                  onRequestClose={closeModalEditCategory}
                                  style={modalStyles}
                                >
                                  <div className={style.modalBase}>
                                    <div className="d-flex flex-row justify-content-between">
                                      <div>
                                        <p className={style.modalBaseText}>
                                          Edit Category
                                        </p>
                                      </div>
                                      <div
                                        type="button"
                                        onClick={closeModalEditCategory}
                                      >
                                        <img src={assets.logomodalx} alt="" />
                                      </div>
                                    </div>
                                    <div>
                                      <form
                                        className={style.modalForm}
                                        action=""
                                      >
                                        <div>
                                          <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Category name"
                                            className="form-control"
                                          />
                                        </div>
                                        <div>
                                          <button
                                            type="button"
                                            className={
                                              style.modalEditCategoryButton
                                            }
                                          >
                                            Edit Category
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </Modal>
                              </div>
                              <div>
                                <button
                                  className={style.modalCategoryDelete}
                                  type="button"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
                <div>
                  <button
                    type="button"
                    className={style.addProduct}
                    onClick={openModalProduct}
                  >
                    Product
                  </button>
                  <Modal
                    isOpen={modalProduct}
                    onRequestClose={closeModalProduct}
                    style={modalStyles}
                  >
                    <div className={style.modalBase}>
                      <div className="d-flex flex-row justify-content-between">
                        <div>
                          <p className={style.modalBaseText}>Add Product</p>
                        </div>
                        <div type="button" onClick={closeModalProduct}>
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
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              name="price"
                              id="price"
                              placeholder="Price"
                              className="form-control"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-row gap-3 justify-content-between">
                            <div>
                              <input
                                type="text"
                                name="stock"
                                id="stock"
                                placeholder="Stock"
                                className="form-control"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                name="category"
                                id="category"
                                placeholder="category"
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row gap-3 justify-content-between">
                            <div>
                              <textarea
                                name="description"
                                id="description"
                                cols="20"
                                rows="7"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                            <div>
                              <span>
                                <label htmlFor="photo">
                                  <img src={assets.logophoto} alt="" />
                                </label>
                              </span>
                              <input
                                className={style.modalFormFile}
                                type="file"
                                name="photo"
                                id="photo"
                                onChange={handlePhotoChange}
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              className={style.modalAddButton}
                              onClick={handleCreate}
                            >
                              Add Product
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
              <div className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    href="/profile-seller/product"
                    className="nav-link active"
                    aria-current="page"
                  >
                    All items
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/profile-seller/sold-out" className="nav-link">
                    Sold out
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/profile-seller/archived" className="nav-link">
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
                {product ? (
                  product.map((item) => (
                    <>
                      <div key={item.id} className={style.productValueBase}>
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
                            <p className={style.priceText}>$. {item.price}</p>
                          </div>
                          <div className={style.stockBase}>
                            <p className={style.stockText}>{item.stock}</p>
                          </div>
                          <div className={style.actionBaseValue}>
                            <div>
                              <button
                                key={item.id}
                                type="button"
                                className={style.editProductButton}
                                onClick={() => openModalEditProduct(item.id)}
                              >
                                Edit
                              </button>
                              <Modal
                                isOpen={modalEditProduct.status}
                                onRequestClose={closeModalEditProduct}
                                style={modalStyles}
                              >
                                <div className={style.modalBase}>
                                  <div className="d-flex flex-row justify-content-between">
                                    <div>
                                      <p className={style.modalBaseText}>
                                        Edit Product
                                      </p>
                                    </div>
                                    <div
                                      type="button"
                                      onClick={closeModalEditProduct}
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
                                          name="price"
                                          id="price"
                                          placeholder="Price"
                                          className="form-control"
                                        />
                                      </div>
                                      <div className="d-flex flex-row gap-3 justify-content-between">
                                        <div>
                                          <input
                                            type="text"
                                            name="stock"
                                            id="stock"
                                            placeholder="Stock"
                                            className="form-control"
                                          />
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            name="category"
                                            id="category"
                                            placeholder="category"
                                            className="form-control"
                                          />
                                        </div>
                                      </div>
                                      <div className="d-flex flex-row gap-3 justify-content-between">
                                        <div>
                                          <textarea
                                            name="description"
                                            id="description"
                                            cols="20"
                                            rows="7"
                                            className="form-control"
                                          />
                                        </div>
                                        <div>
                                          <span>
                                            <img
                                              src={assets.logophoto}
                                              alt=""
                                            />
                                          </span>
                                          <input
                                            className={style.modalFormFile}
                                            type="file"
                                            name="photo"
                                            id="photo"
                                          />
                                        </div>
                                      </div>
                                      <div className="mt-4">
                                        <button
                                          type="button"
                                          className={style.modalAddButton}
                                        >
                                          Edit Product
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
                                onClick={() => deleteProduct(item.id)}
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

export default SellerProduct;
