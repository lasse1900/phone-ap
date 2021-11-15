import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/contacts/">contacts</Link>
        </li>
        <li>
          <Link to="/add/">add</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
