import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Card, Image, Modal, InputGroup } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../App.css";
import { BsFillExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import AddProduct from "./AddProduct";
import { FaTimes } from "react-icons/fa";
function TableProduct() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);

  const checkbox = useRef();
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");
  // const [isCheckedMap, setIsCheckedMap] = useState({});
  const handleClose = () => {
    setShow(false);
    setAlertType("");
  };
  const handleShow = (type) => {
    setShow(true);
    setAlertType(type);
    // กำหนดเวลาให้ Modal หายไปเมื่อเวลาผ่านไป 3 วินาที
    setTimeout(() => {
      handleClose();
    }, 3000);
  };
  const getIcon = () => {
    if (alertType === "error") {
      return <BsFillExclamationCircleFill color="red" size={54} />;
    } else if (alertType === "success") {
      return <BsCheckCircleFill color="green" size={64} />;
    } else {
      return null;
    }
  };

  const showAlert = (type) => {
    handleShow(type);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/readProduct")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleClick = (e) => {
    const { value, checked, id } = e.target;
    console.log(`${value} is ${checked} id as ${id}`);
    const productId = id;
    fetch(`http://localhost:3000/api/products/${productId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        status: checked ? "open" : "closed",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleSearch();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const offset = currentPage * perPage;
  const currentPageData = products.slice(offset, offset + perPage);
  //============================================ ดึงข้อมูล ===============================//
  const fetchProducts = () => {
    fetch("http://localhost:3000/api/readProduct")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  };
  //========================= select Type Product =======================//
  const [Producttypes, setTypeProducts] = useState([]);
  const fetchTypeData = () => {
    fetch("http://localhost:3000/read")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTypeProducts(data);
      });
  };
  useEffect(() => {
    fetchTypeData();
  }, []);
  //======================================== edite ==============================================//
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditModal = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    handleShowModal();
  };
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = () => {
    setIsSaving(true);

    fetch(`http://localhost:3000/api/editProduct/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSaving(false);
        showAlert("success");
        fetchProducts();
        handleCloseModal();
      })
      .catch((error) => {
        setIsSaving(false);
        showAlert("error");
        console.error("Error saving product:", error);
      });
  };

  //=================================== delete ====================================//
  const handleDelete = (productId) => {
    fetch(`http://localhost:3000/api/deleteProduct/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product deleted successfully");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  //========================================= search ==========================================//
  const [searchText, setSearchText] = useState(""); // เพิ่ม state สำหรับเก็บค่าการค้นหา
  console.log(searchText.filepath, "5555555555asda");
  const handleSearch = () => {
    fetch(
      "http://localhost:3000/searchProduct?keyword=" +
        encodeURIComponent(searchText),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);

        console.log(data, "555555555555555555555");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox ">
            <div class="ibox-title">
              <h5>ตารางจัดการสินค้า</h5>
            </div>
            <div class="ibox-content">
              <div class="row">
                <div class="col-sm-11">
                  <div class="input-group">
                    <input
                      placeholder="Search"
                      type="text"
                      class="form-control form-control-sm"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />{" "}
                    <span class="input-group-append">
                      {" "}
                      <button
                        type="button"
                        class="btn btn-sm btn-primary"
                        onClick={handleSearch}
                      >
                        Go!
                      </button>{" "}
                    </span>
                  </div>
                </div>
                <div class="col-sm-1">
                  <AddProduct />
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>รหัส</th>
                      <th>รูป</th>
                      <th>ชื่อ</th>
                      <th>ราคา</th>
                      <th>สถานะ</th>
                      <th>เปิด-ปิด</th>
                      <th>เครื่องมือ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData &&
                      currentPageData.length > 0 &&
                      currentPageData.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>
                            <Image
                              src={`http://localhost:3000/${product.filepath}`}
                              style={{ width: "80px", height: "80px" }}
                              rounded
                            />
                          </td>
                          <td>{product.Pname}</td>
                          <td>{product.Pprice}</td>
                          <td>
                            <span
                              className={`label ${
                                product.status === "open"
                                  ? "label-primary"
                                  : "label-danger"
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>

                          <td>
                            {" "}
                            <div className="switch">
                              <div className="onoffswitch">
                                <input
                                  type="checkbox"
                                  ref={checkbox}
                                  checked={
                                    product.status === "open" ? true : false
                                  }
                                  className="onoffswitch-checkbox"
                                  id={`${product.id}`}
                                  onChange={handleClick}
                                />
                                <label
                                  className="onoffswitch-label"
                                  htmlFor={`${product.id}`}
                                >
                                  <span className="onoffswitch-inner"></span>
                                  <span className="onoffswitch-switch"></span>
                                </label>
                              </div>
                            </div>
                          </td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleEditModal(product.id)}
                            >
                              แก้ไข
                            </Button>{" "}
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(product.id)}
                            >
                              ลบ
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <ReactPaginate
                previousLabel={"ก่อนหน้า"}
                nextLabel={"ถัดไป"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(products.length / perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header>
                <Modal.Title className="font">แก้ไขรายการสินค้า</Modal.Title>{" "}
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                  style={{ background: "red" }}
                >
                  <FaTimes />
                </button>
              </Modal.Header>
              <Modal.Body>
                {selectedProduct && (
                  <Card>
                    <Card.Body>
                      <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          placeholder="ชื่อรายการ"
                          value={selectedProduct.Pname}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              Pname: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          placeholder="รายละเอียด"
                          value={selectedProduct.Pdetail}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              Pdetail: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Form.Select
                          aria-label="Default select example"
                          value={selectedProduct.Ptype}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              Ptype: e.target.value,
                            })
                          }
                        >
                          <option>เลือกประเภท</option>
                          {Producttypes.map((Producttype) => (
                            <option
                              key={Producttype.idType}
                              value={Producttype.Ptype}
                            >
                              {Producttype.Ptype}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          placeholder="ราคา"
                          value={selectedProduct.Pprice}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              Pprice: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <br />
                    </Card.Body>
                  </Card>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  ปิด
                </Button>
                <Button
                  variant="success"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "กำลังบันทึก..." : "บันทึก"}
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <p>Save {alertType}</p>
                {getIcon()}{" "}
                {alertType === "error"
                  ? "Error"
                  : alertType === "success"
                  ? "Success"
                  : ""}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableProduct;
