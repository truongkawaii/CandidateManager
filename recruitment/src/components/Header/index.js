import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/recruitment">Dashboard</Link>
      </div>
      <ul className="header__menu">
        <li>
          <Link to="/login">Logout</Link>
        </li>
        <li>
          <Link to="/">Admin</Link>
        </li>
        <li>
          <Link to="/">
            <img
              src="https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/103762418_699967644170435_279729047885446335_n.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_ohc=zK5KSbkwVsAAX_BM2rO&_nc_ht=scontent.fhan2-6.fna&oh=62fb7786f42444b68acefc43a0303b2c&oe=5F83E1D4"
              alt=""
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
