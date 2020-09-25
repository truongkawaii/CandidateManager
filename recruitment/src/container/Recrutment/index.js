import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getData, paginationDataJobs } from '../../state/actions/table.action';
import ListJD from '../../components/ListJD';

const Recrutment = () => {
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.allJobs.paginationData);
  const dataListJobs = useSelector(state => state.allJobs.data);
  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
  const pageNumbers = [];
  const [stateBtn, setStateBtn] = useState(1);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (dataListJobs) {
    for (let i = 1; i <= Math.ceil(dataListJobs.length / 4); i++) {
      pageNumbers.push({ val: i, id: i });
    }
  }
  // Handler Click pagination
  const handlerClick = index => {
    setStateBtn(index);
    dispatch(paginationDataJobs(index));
  };

  // map button pagination
  const buttonPagination = pageNumbers.map((item, index) => {
    let type = '';
    if (index === stateBtn - 1) {
      type = 'primary';
    }
    return (
      <Button type={type} onClick={() => handlerClick(index + 1)} key={item.id}>
        {item.val}
      </Button>
    );
  });

  return (
    <Fragment>
      <div className="jd-title">
        <h3>DANH SÁCH JD TUYỂN DỤNG</h3>
        <div className="jd-option">
          <Button className="option-jd" type="primary" size="large">
            <Link to="/add-job">THÊM JD</Link>
          </Button>
          <Button className="option-jd" size="large" danger>
            Xóa nhiều JD
          </Button>
        </div>
      </div>
      {dataList ? (
        <>
          <ListJD ListJdJob={dataList} />
          <div className="button-pagination"> {buttonPagination}</div>
        </>
      ) : (
        <div className="show-spin">
          <Spin indicator={antIcon} />
        </div>
      )}
    </Fragment>
  );
};

export default Recrutment;
