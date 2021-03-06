import React from 'react';
import { Link } from 'react-router-dom';
import { SKILL_CANDIDATE } from '../../../constant/constant';
// import { Checkbox } from 'antd';
import PropTypes from 'prop-types';

ItemJD.propTypes = {
  itemJob: PropTypes.object.isRequired,
};
function ItemJD({ itemJob }) {
  // console.log(itemJob, 'itemJD');
  const {
    name,
    position,
    waysofwork,
    experience,
    address,
    description,
    requirements,
    id,
  } = itemJob;
  return (
    <div className="item-job">
      {/* <Checkbox disabled={false} /> */}
      <h1 className="job-title">{name}</h1>
      <h2>{position}</h2>
      <h2>{waysofwork}</h2>
      <h2>{experience}</h2>
      <h2>{address}</h2>
      <h2>{description}</h2>
      <h2>
        {requirements.map(item => {
          const listSkill = SKILL_CANDIDATE.filter(
            item2 => item2.id === item,
          )[0].name;
          return <span className="skill-item">{listSkill}</span>;
        })}
      </h2>
      <h4 className="job-desc">
        <Link
          to={{
            pathname: `/recruitment/${id}`,
          }}
        >
          Chi tiết
        </Link>
      </h4>
      <h4>
        <Link
          to={{
            pathname: `/update-job/${id}`,
          }}
        >
          <span className="update-btn">
            <i className="fas fa-pen-square" />
          </span>
        </Link>
      </h4>
    </div>
  );
}

export default ItemJD;
