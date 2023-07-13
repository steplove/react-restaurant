import React, { useEffect, useState } from "react";
import { BsFillExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { Form, Button, Card, Modal, InputGroup } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import AddEmployee from "./AddEmployee";
function TableEmployee() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const offset = currentPage * perPage;
  const currentPageData = employees.slice(offset, offset + perPage);
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
    fetch("http://localhost:3000/readEmployee")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error(error));
  }, []);
  //============================================ ดึงข้อมูล ===============================//
  const fetchEmployees = () => {
    fetch("http://localhost:3000/readEmployee")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error(error));
  };
  //======================================== edite ==============================================//
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const handleEditModal = (employeeId) => {
    const employee = employees.find((p) => p.id === employeeId);
    setSelectedEmployees(employee);
    handleShowModal();
  };
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = () => {
    setIsSaving(true);

    fetch(`http://localhost:3000/api/editEmployee/${selectedEmployees.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEmployees),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSaving(false);
        showAlert("success");
        fetchEmployees();
        handleCloseModal();
      })
      .catch((error) => {
        setIsSaving(false);
        showAlert("error");
        console.error("Error saving product:", error);
      });
  };

  //=================================== delete ====================================//
  const handleDelete = (employeeId) => {
    fetch(`http://localhost:3000/api/deleteEmployee/${employeeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product deleted successfully");
        fetchEmployees();
        showAlert("success");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        showAlert("error");
      });
  };
  //========================= select Rank Product =======================//
  const [Employeetypes, setEmployeetypes] = useState([]);
  const fetchTypeData = () => {
    fetch("http://localhost:3000/readRank")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEmployeetypes(data);
        
      });
  };
  useEffect(() => {
    fetchTypeData();
  }, []);
  //========================================= search Employee ==========================================//
  const [searchText, setSearchText] = useState(""); // เพิ่ม state สำหรับเก็บค่าการค้นหา
  const handleSearch = () => {
    fetch(
      "http://localhost:3000/searchEmployee?keyword=" +
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
        setEmployees(data);
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
              <h5>ตารางจัดการพนักงาน</h5>
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
                  <AddEmployee />
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>รหัส</th>
                      <th>ชื่อ</th>
                      <th>นามสกุล</th>
                      <th>เบอร์</th>
                      <th>ชื่อผู้ใช้</th>
                      <th>ระดับ</th>
                      <th>เครื่องมือ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData &&
                      currentPageData.length > 0 &&
                      currentPageData.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.firstName}</td>
                          <td>{employee.lastName}</td>
                          <td>{employee.phoneNO}</td>
                          <td>{employee.username}</td>
                          <td>{employee.rank}</td>
                          <td>
                            {" "}
                            <Button
                              variant="warning"
                              onClick={() => handleEditModal(employee.id)}
                            >
                              แก้ไข
                            </Button>{" "}
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(employee.id)}
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
                pageCount={Math.ceil(employees.length / perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header>
                <Modal.Title className="font">แก้ไขพนักงาน</Modal.Title>{" "}
              </Modal.Header>
              <Modal.Body>
                {selectedEmployees && (
                  <Card>
                    <Card.Body>
                      <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          placeholder="ชื่อ"
                          value={selectedEmployees.firstName}
                          onChange={(e) =>
                            setSelectedEmployees({
                              ...selectedEmployees,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          placeholder="นามสกุล"
                          value={selectedEmployees.lastName}
                          onChange={(e) =>
                            setSelectedEmployees({
                              ...selectedEmployees,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          placeholder="เบอร์โทรศัพท์"
                          value={selectedEmployees.phoneNO}
                          onChange={(e) =>
                            setSelectedEmployees({
                              ...selectedEmployees,
                              phoneNO: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          placeholder="ชื่อผู้ใช้"
                          value={selectedEmployees.username}
                          onChange={(e) =>
                            setSelectedEmployees({
                              ...selectedEmployees,
                              username: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Form.Select
                          aria-label="Default select example"
                          value={selectedEmployees.rank}
                          onChange={(e) =>
                            setSelectedEmployees({
                              ...selectedEmployees,
                              rank: e.target.value,
                            })
                          }
                        >
                          <option>เลือกประเภท</option>
                          {Employeetypes.map((Employeetype) => (
                            <option
                              key={Employeetype.idrank}
                              value={Employeetype.rank}
                            >
                              {Employeetype.rank}
                            </option>
                          ))}
                        </Form.Select>
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
                <p>{alertType}</p>
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

export default TableEmployee;
