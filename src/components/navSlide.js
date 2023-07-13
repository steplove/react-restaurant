import React from "react";
import logo from "../images/soda.jpg";
function navSlide() {
  return (
    <>
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
                  <span className="block m-t-xs font-bold">David Williams</span>
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
            <li className="active">
              <a href="index.html">
                <i className="fa fa-th-large"></i>{" "}
                <span className="nav-label">จัดการร้าน</span>{" "}
                <span className="fa arrow"></span>
              </a>
              <ul className="nav nav-second-level">
                <li className="active">
                  <a href="manageproduct">จัดการสินค้า</a>
                </li>
                <li>
                  <a href="dashboard_2.html">จัดการพนักงาน</a>
                </li>
                <li>
                  <a href="dashboard_3.html">จัดการรายการสั่งซื้อ</a>
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
    </>
  );
}

export default navSlide;
