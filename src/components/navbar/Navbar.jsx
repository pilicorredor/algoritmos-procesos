import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbar = ({ resetProcessList }) => {
  const handleProcess = () => {
    resetProcessList([]);
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
        //style={{ height: '80px' }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/algoritmos-procesos/"
            onClick={handleProcess}
          >
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
              <NavLink
                className="nav-link"
                to="/algoritmos-procesos/"
                onClick={handleProcess}
              >
                {' '}
                Inicio{' '}
              </NavLink>
              <NavLink
                className="nav-link"
                to="/algoritmos-procesos/Round_Robin"
                onClick={handleProcess}
              >
                {' '}
                Round Robin{' '}
              </NavLink>
              <NavLink
                className="nav-link"
                to="/algoritmos-procesos/FCFS"
                onClick={handleProcess}
              >
                {' '}
                First-come First-Served{' '}
              </NavLink>
              <NavLink
                className="nav-link"
                to="/algoritmos-procesos/SJF"
                onClick={handleProcess}
              >
                {' '}
                Shortest Job First{' '}
              </NavLink>
              <NavLink
                className="nav-link"
                to="/algoritmos-procesos/SRTF"
                onClick={handleProcess}
              >
                {' '}
                Short Remaining Time First
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
