import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import ListCandidate from '../../components/ListCandidate';
import { getDataCandidate } from '../../state/actions/table.action';

function Candidate() {
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.allCandidate.data);
  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

  useEffect(() => {
    dispatch(getDataCandidate());
  }, [dispatch]);
  // console.log(dataList, 'dataList');
  return (
    <Fragment>
      <div className="jd-title">
        <h3>DANH SÁCH CV ỨNG VIÊN</h3>
        <div className="jd-option">
          <Button className="option-jd" type="primary" size="large">
            <Link
              to={{
                pathname: '/add-candidate',
              }}
            >
              Thêm ứng viên
            </Link>
          </Button>
          <Button className="option-jd" size="large" danger>
            Xóa nhiều ứng viên
          </Button>
        </div>
      </div>
      {dataList ? (
        <ListCandidate listCandidateItem={dataList} />
      ) : (
        <Spin indicator={antIcon} />
      )}
    </Fragment>
  );
}

export default Candidate;
