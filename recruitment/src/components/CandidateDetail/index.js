import React, { useEffect, useState } from 'react';
import { Spin, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams, Link, useHistory } from 'react-router-dom';
import {
  getDataCandidate,
  deleteCandidate,
} from '../../state/actions/table.action';
import { STATUS_CANDIDATE } from '../../constant/constant';

function CandidateDetail() {
  const dispatch = useDispatch();
  const param = useParams();
  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
  const listData = useSelector(state => state.allCandidate.data);
  const history = useHistory();

  useEffect(() => {
    dispatch(getDataCandidate());
  }, [dispatch, param.idCandidate, listData]);
  let detail = <Spin indicator={antIcon} />;
  const [showModal, setShowModal] = useState(false);

  const handleOk = () => {
    setShowModal(false);
    dispatch(deleteCandidate(param.idRecruitment));
    history.push(`/recruitment`);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const modal = (
    <Modal
      title="Xác nhận xóa"
      visible={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Hủy"
      okText="Đồng ý"
    >
      <p>Bạn thật sự muốn xóa ứng viên này ?</p>
    </Modal>
  );
  if (listData) {
    detail = listData
      .filter(item => item.id === param.idCandidate)
      .map(
        ({
          id,
          name,
          birthday,
          phone,
          email,
          // eslint-disable-next-line camelcase
          job_apply,
          note,
          // eslint-disable-next-line camelcase
          created_at,
          // eslint-disable-next-line camelcase
          updated_at,
          status,
        }) => {
          const statusValue = STATUS_CANDIDATE.filter(
            item => item.statusId === status,
          )[0].value;
          return (
            <div key={id}>
              <div className="option-candidate">
                <h1 className="details-title">Thông tin ứng viên</h1>
                <div className="option-list">
                  <Link to="/">Thêm ứng viên mới</Link>
                  <Link
                    to={{
                      pathname: `/edit-candidate/${id}`,
                    }}
                  >
                    Sửa ứng viên
                  </Link>
                  <span
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="delete-jd"
                  >
                    Xóa Ứng viên
                  </span>
                </div>
              </div>
              <div className="info-details">
                <h3>Họ và tên : {name}</h3>
                <h2>Năm sinh : {birthday}</h2>
                <h2>Số điện thoại: {phone}</h2>
                <h2>Email : {email}</h2>
                {/* eslint-disable-next-line camelcase */}
                <h2>Công việc ứng tuyển : {job_apply}</h2>
                <h2>Status : {statusValue}</h2>
                <h2>Ghi chú : {note}</h2>
                {/* eslint-disable-next-line camelcase */}
                <h2>Ngày tạo : {created_at}</h2>
                {/* eslint-disable-next-line camelcase */}
                <h2>Ngày update gần nhất : {updated_at}</h2>
              </div>
            </div>
          );
        },
      );
  }
  return (
    <div>
      {detail}
      {modal}
    </div>
  );
}

export default CandidateDetail;
