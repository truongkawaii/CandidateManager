import React from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { SIDEBAR_OPTION } from '../../constant/constant';

function ListOptions() {
  const location = useLocation();

  console.log(location, 'location');
  const listOption = SIDEBAR_OPTION.map(item => {
    let style = { color: '#869fb1' };
    if (item.path === location.pathname) {
      style = { backgroundColor: '#354a58' };
    }
    return (
      <li key={item.id}>
        <NavLink style={style} to={item.path}>
          {item.name}
        </NavLink>
      </li>
    );
  });

  return <ul className="list-option">{listOption}</ul>;
}

export default ListOptions;
