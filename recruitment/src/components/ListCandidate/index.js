import React from 'react';
import PropTypes from 'prop-types';
import CandidateItem from './CandidateItem';

ListCandidate.propTypes = {
  listCandidateItem: PropTypes.array.isRequired,
};

function ListCandidate({ listCandidateItem }) {
  console.log(listCandidateItem, 'listCandidateItem');
  const listItem = listCandidateItem.map(item => {
    return <CandidateItem key={item.id} itemCandidate={item} />;
  });
  return (
    <div className="table-candidate">
      <ul className="title-candidate">
        <li>
          <h2>Name</h2>
        </li>
        <li>
          <h2>Job</h2>
        </li>
        <li>
          <h2>Position</h2>
        </li>
        <li>
          <h2>Status</h2>
        </li>
        <li>
          <h2>Action</h2>
        </li>
        <li>
          <h2>Edit</h2>
        </li>
      </ul>
      {listItem}
    </div>
  );
}

export default ListCandidate;
