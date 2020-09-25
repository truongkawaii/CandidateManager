import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { STATUS_CANDIDATE } from '../../../constant/constant';

CandidateItem.propTypes = {
  itemCandidate: PropTypes.object.isRequired,
};
function CandidateItem({ itemCandidate }) {
  // eslint-disable-next-line camelcase
  const { name, job_apply, position_apply, status, id } = itemCandidate;
  const statusValue = STATUS_CANDIDATE.filter(
    item => item.statusId === status,
  )[0].value;
  console.log(statusValue);
  return (
    <ul className="item-candidate">
      <li>
        <h2>{name}</h2>
      </li>
      <li>
        {/* eslint-disable-next-line camelcase */}
        <h2>{job_apply}</h2>
      </li>
      <li>
        {/* eslint-disable-next-line camelcase */}
        <h2>{position_apply}</h2>
      </li>
      <li>
        <h2>{statusValue}</h2>
      </li>
      <li className="job-desc">
        <Link
          to={{
            pathname: `/candidate/${id}`,
          }}
        >
          Chi tiết
        </Link>
      </li>
      <li className="">
        <Link
          to={{
            pathname: `/edit-candidate/${id}`,
          }}
        >
          <span className="edit-btn">
            <i className="fas fa-edit" />
          </span>
        </Link>
      </li>
    </ul>
  );
}

export default CandidateItem;
