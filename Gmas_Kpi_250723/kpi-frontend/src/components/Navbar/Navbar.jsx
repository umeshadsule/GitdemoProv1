import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import './Navbar.css';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [colorSelected, setColorSelected] = useState("");

  let navigate = useNavigate();

  const backToCountryPage = () => {
    let path = `/gmas-kpis`;
    navigate(path, { state: { dateValue: moment().format('YYYY-MM-DD') } });
  }

  const changeColorOnSelection = (field) => {
    setColorSelected(field);
  }

  return (
    <>
      <div className="container-fluid makePositionFixNavBar" nav_bg>
        <div className="row">
          <div className="mx-auto">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <a className="navbar-brand titleClass" href="#" color="white">
                  <span className="titleClass">AMERICAN EXPRESS</span>
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setShow(!show)}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className={`nav-item ${colorSelected === "Monitor_Submission" ? "YellowColor" : ""}`}>
                      <a
                        className="nav-link active"
                        onClick={() => {
                          backToCountryPage();
                          changeColorOnSelection("Monitor_Submission");
                        }}
                        href="/"
                      >
                        Monitor Submission
                      </a>
                    </li>
                    <li className={`nav-item ${colorSelected === "payment-activity" ? "YellowColor" : ""}`}>
                      <a
                        className="nav-link active"
                        onClick={() => {
                          changeColorOnSelection("payment-activity");
                        }}
                        href="/payment-activity"
                      >
                        Payment Activity
                      </a>
                    </li>
                    <li className={`nav-item ${colorSelected === "Reporting" ? "YellowColor" : ""}`}>
                      <a
                        className="nav-link active"
                        onClick={() => {
                          changeColorOnSelection("Reporting");
                        }}
                        href="/payment-activity"
                      >
                        Reporting
                      </a>
                    </li>
                    <li className={`nav-item gmas-kpis ${colorSelected === "gmas-kpis" ? "YellowColor" : ""}`}>
                      <a
                        className="nav-link active"
                        onClick={() => {
                          backToCountryPage();
                          changeColorOnSelection("gmas-kpis");
                        }}
                        href="/gmas-kpis"
                      >
                        GMAS KPIs
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
