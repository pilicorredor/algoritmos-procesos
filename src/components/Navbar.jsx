import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to = '/'>Simulador</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to = '/'>Inicio</Link>
              <Link className="nav-link" to = '/Round_Robin'>Round Robin</Link>
              <Link className="nav-link" to = '/FCFS'>First-come First-Served</Link>
              <Link className="nav-link" to = '/SJF'>Shortest Job First</Link>
              <Link className="nav-link" to = '/SRTF'>Short Remaining Time First</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
