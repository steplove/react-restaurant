import React, { useState, useEffect } from "react";
import { Col, Card, Form, Button, InputGroup, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
const AddEmployee = () => {
  useEffect(() => {
    fetchRankData();
  }, []);

  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNO, setPhoneNO] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rank, setRank] = useState("");
  //=================================== Clear data ========================//
  const handleCancel = () => {
    setPrefix("");
    setFirstName("");
    setLastName("");
    setPhoneNO("");
    setUsername("");
    setPassword("");
    setRank("");
  };
  //======================== Regis ==============================//
  const handleRegister = (e) => {
    e.preventDefault();

    const employeeData = {
      perName: prefix,
      firstName: firstName,
      lastName: lastName,
      phoneNO: phoneNO,
      username: username,
      password: password,
      rank: rank,
    };
    console.log(employeeData);
    fetch("http://localhost:3000/addEmploye", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ไม่สามารถบันทึกข้อมูลได้");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        alert("บันทึกข้อมูลสำเร็จ");
        handleCancel();
      })
      .catch((error) => {
        console.error(error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.message);
        handleCancel();
      });
  };

  //================================ select Rank ===================================//
  const [rankEmployee, setRankEmployee] = useState([]);
  const fetchRankData = () => {
    fetch("http://localhost:3000/readRank")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRankEmployee(data);
      });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {" "}
      <Button variant="primary" onClick={handleShow}>
        <div className="font">เพิ่มพนักงาน </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="font">เพิ่มพนักงาน</Modal.Title>{" "}
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
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="prefixSelect">
                  <Form.Label>คำนำหน้า</Form.Label>
                  <Form.Control
                    as="select"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                  >
                    <option value="">เลือกคำนำหน้า</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="firstNameInput">
                  <Form.Label>ชื่อ</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="lastNameInput">
                  <Form.Label>นามสกุล</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="phoneNoInput">
                  <Form.Label>เบอร์โทรศัพท์</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNO}
                    onChange={(e) => setPhoneNO(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="usernameInput">
                  <Form.Label>ชื่อผู้ใช้</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="passwordInput">
                  <Form.Label>รหัสผ่าน</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Label>ตำแหน่ง</Form.Label>
                <InputGroup>
                  <Form.Select
                    aria-label="Default select example"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                  >
                    <option>เลือกประเภท</option>
                    {rankEmployee &&
                      rankEmployee.length > 0 &&
                      rankEmployee.map((rankEmployees) => (
                        <option
                          key={rankEmployees.idrank}
                          value={rankEmployees.rank}
                        >
                          {rankEmployees.rank}
                        </option>
                      ))}
                  </Form.Select>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer className="font">
          <Button variant="success" onClick={handleRegister}>
            เพิ่มรายการ
          </Button>{" "}
          <Button variant="secondary" onClick={handleCancel}>
            เคลียร์
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEmployee;
