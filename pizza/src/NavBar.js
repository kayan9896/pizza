import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/deals">Deals</Link></li>
        <li><Link to="/pizzas">Pizzas</Link></li>
        <li><Link to="/drinks">Drinks</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;