import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ItemJD from './ItemJD';

ListJD.propTypes = {
  ListJdJob: PropTypes.array.isRequired,
};

function ListJD({ ListJdJob }) {
  // const { ListJdJob } = props;
  let dataList;

  if (ListJdJob) {
    dataList = ListJdJob.map(item => <ItemJD key={item.id} itemJob={item} />);
  }

  return <Fragment>{dataList}</Fragment>;
}

export default ListJD;
