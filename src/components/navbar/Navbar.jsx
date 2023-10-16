import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
        //style={{ height: '80px' }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/algoritmos-procesos/">
            SimuSchedule
          </Link>
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
              <NavLink className="nav-link" to="/algoritmos-procesos/">
                {' '}
                Inicio{' '}
              </NavLink>
              <NavLink
                className="nav-link"
                to="/algoritmos-procesos/Round_Robin"
              >
                {' '}
                Round Robin{' '}
              </NavLink>
              <NavLink className="nav-link" to="/algoritmos-procesos/FCFS">
                {' '}
                First-come First-Served{' '}
              </NavLink>
              <NavLink className="nav-link" to="/algoritmos-procesos/SJF">
                {' '}
                Shortest Job First{' '}
              </NavLink>
              <NavLink className="nav-link" to="/algoritmos-procesos/SRTF">
                {' '}
                Short Remaining Time First
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
