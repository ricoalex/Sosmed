import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: {isAuthenticated, loading}, logout}) => {

  // membuat link auth dan guest non auth
  const authLink = (
      <ul>
        <li>
          <Link to="/profiles">Members</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to ="/dashboard">
            <i className='fa fa-user' />{' '}
            <span className='hide-sm'>Dashboard</span>  
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fa fa-sign-out' />{' '}
            <span className='hide-sm'>Logout</span>  
          </a>
        </li>
      </ul>
  )

  const guestLink = (
    <ul>
        <li>
          <Link to="/profiles">Members</Link>
        </li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  )

  return(
    <nav className="navbar bg-dark">
      <h1>
        <a href="/"><i className="fa fa-code"></i> Remonds App</a>
      </h1>
  { !loading && (<Fragment>{ isAuthenticated ? authLink : guestLink }</Fragment>) }
    </nav>
  )
};

// protypes
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

// mapStateProps
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);