import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to='/employees'>
          <i className='fas fa-user' />
          <span className='ml-1'>Employees</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/reviews'>
          <i className='fas fa-pen' />
          <span className='ml-1'>Reviews</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/dashboard'>
          <i className='fas fa-home' />
          <span className='ml-1'>Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          <span className='ml-1'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to='/employees'>Employees</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/register'>Register</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to='/' className="navbar-brand" href="#">Employee Review</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {!loading && isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
