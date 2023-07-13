import React, { useEffect } from "react";
import NavBar from "../components/navBar";
import logo from "../images/soda.jpg";
import TableProduct from "../components/TableProduct";
function Home() {
  //===================== Check Token ========================//
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log(data.status);
        } else {
          console.log(data.status);
          alert("Token หมดอายุ");
          localStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);
  return (
    <>
      <div id="wrapper">
        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
              <li className="nav-header">
                <div className="dropdown profile-element">
                  <img
                    className="rounded-circle"
                    src={logo}
                    alt="Logo"
                    style={{ width: "50px;", height: "50px" }}
                  />
                  <a
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                    href={"/"}
                  >
                    <span className="block m-t-xs font-bold">
                      David Williams
                    </span>
                    <span className="text-muted text-xs block">
                      Art Director <b className="caret"></b>
                    </span>
                  </a>
                  <ul className="dropdown-menu animated fadeInRight m-t-xs">
                    <li>
                      <a className="dropdown-item" href="profile.html">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="contacts.html">
                        Contacts
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="mailbox.html">
                        Mailbox
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a className="dropdown-item" href="login.html">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="logo-element">IN+</div>
              </li>
              <li>
                <a href="/">
                  <i className="fa fa-list"></i>{" "}
                  <span className="nav-label">จัดการร้าน</span>{" "}
                  <span className="fa arrow"></span>
                </a>
                <ul className="nav nav-second-level">
                  <li className="active">
                    <a href="manageproduct">จัดการสินค้า</a>
                  </li>
                  <li>
                    <a href="manageemployee">จัดการพนักงาน</a>
                  </li>
                  <li>
                    <a href="manageoder">จัดการรายการสั่งซื้อ</a>
                  </li>
                  <li>
                    <a href="dashboard_4_1.html">จัดการใบเสร็จ</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="layouts.html">
                  <i className="fa fa-diamond"></i>{" "}
                  <span className="nav-label">Layouts</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <div className="row border-bottom">
            <NavBar />
          </div>
          <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-12">
              <h2>หน้าแรก</h2>
            </div>
          </div>
          <div class="wrapper wrapper-content animated fadeInRight">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="widget style1 navy-bg">
                      <div class="row">
                        <div class="col-4">
                          <i class="fa fa-cutlery fa-5x"></i>
                        </div>
                        <div class="col-8 text-right">
                          <span> รายการสั่งซื้อทั้งหมด </span>
                          <h2 class="font-bold">0</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="widget style1 lazur-bg">
                      <div class="row">
                        <div class="col-4">
                          <i class="fa fa-money fa-5x"></i>
                        </div>
                        <div class="col-8 text-right">
                          <span> ยอดเงินรวม </span>
                          <h2 class="font-bold">0</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="widget style1 yellow-bg">
                      <div class="row">
                        <div class="col-4">
                          <i class="fa fa-group fa-5x"></i>
                        </div>
                        <div class="col-8 text-right">
                          <span> จำนวนโต๊ะที่เปิด </span>
                          <h2 class="font-bold">0</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="widget style1 red-bg">
                      <div class="row">
                        <div class="col-4">
                          <i class="fa fa-calculator fa-5x"></i>
                        </div>
                        <div class="col-8 text-right">
                          <span> คำสั่งซื้อที่สำเร็จ </span>
                          <h2 class="font-bold">0</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default Home;
