import React from 'react';
import { SIDEBAR_OPTION } from '../../constant/constant';
import { Link } from 'react-router-dom';
function ListOptions() {
  const listOption = SIDEBAR_OPTION.map((item, index) => {
    return (
      <li key={index}>
        <Link to={item.path}>{item.name}</Link>
      </li>
    );
  });

  return <ul className="list-option">{listOption}</ul>;
}

export default ListOptions;
