import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../lib/logo.svg';

const Navbar = props => (
  <nav className="nav">
    <ul>
      <Link to="/" className="nav-link"><li><img className="logo-svg" src={logo} alt="Logo" /></li></Link>
      {/* <Link to="/" className="nav-link"><li>Home</li></Link> */}
      {/* <li><Link to="/" className="nav-link"><em>Act Now!</em></Link></li> */}
      {/* <li><Link to="/" className="nav-link">FAQ</Link></li> */}
      {/* <li><Link to="/" className="nav-link">Contact Us</Link></li> */}
    </ul>
  </nav>
);

export default Navbar;
