import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
function ProductCard() {
  const [products, setProducts] = useState([]);
  const iconWidth = "20px";
  const iconHeight = "20px";
  useEffect(() => {
    fetch("http://localhost:3000/api/readProduct")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <nav  className="navbar navbar-static-top">
        <div className="container-fluid">
          <div className="col-sm-6 col-md-10 col-lg-10">
            <span className="navbar-brand mb-0 h1">สั่งอาหาร</span>
          </div>
          <div className="col-sm-6 col-md-2 col-lg-1 d-flex align-items-center justify-content-center">
            {/* <FaCartShopping style={{ width: iconWidth, height: iconHeight }} />{" "}
            <span className="label label-primary">8</span> */}
                     <ul className="nav navbar-top-links navbar-right">
        <li className="dropdown">
          <a
            className="dropdown-toggle count-info"
            data-toggle="dropdown"
            href={"/"}
          >
            <i className="fa fa-bell"></i>{" "}
            <span className="label label-primary">8</span>
          </a>
          <ul className="dropdown-menu dropdown-alerts">
            <li>
              <a href="mailbox.html" className="dropdown-item">
                <div>
                  <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                  <span className="float-right text-muted small">
                    4 minutes ago
                  </span>
                </div>
              </a>
            </li>
            <li className="dropdown-divider"></li>
            <li>
              <a href="profile.html" className="dropdown-item">
                <div>
                  <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                  <span className="float-right text-muted small">
                    12 minutes ago
                  </span>
                </div>
              </a>
            </li>
            <li className="dropdown-divider"></li>
            <li>
              <a href="grid_options.html" className="dropdown-item">
                <div>
                  <i className="fa fa-upload fa-fw"></i> Server Rebooted
                  <span className="float-right text-muted small">
                    4 minutes ago
                  </span>
                </div>
              </a>
            </li>
            <li className="dropdown-divider"></li>
            <li>
              <div className="text-center link-block">
                <a href="notifications.html" className="dropdown-item">
                  <strong>See All Alerts</strong>
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
          </div>
          <div className="col-sm-6 col-md-2 col-lg-1 d-flex align-items-center">
            <h3>โต๊ะ 1</h3>
          </div>
        </div>
      </nav>
      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div class="col-md-2">
                <div class="ibox" key={product.id}>
                  <div class="ibox-content product-box">
                    <div class="product-imitation">
                      {" "}
                      <Card.Img
                        variant="top"
                        src={`http://localhost:3000/${product.filepath}`}
                        style={{ width: "255px", height: "180px" }}
                      />
                    </div>
                    <div class="product-desc">
                      <span class="product-price">{product.Pprice} ฿</span>
                      <small class="text-muted">{product.Ptype}</small>
                      <a href={"/"} class="product-name">
                        {" "}
                        {product.Pname}
                      </a>
                      <div class="m-t text-righ">
                        <a
                          href={"/"}
                          class="btn btn-xs btn-outline btn-primary"
                        >
                          เพิ่มในตะกร้า <i class="fa fa-long-arrow-right"></i>{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
