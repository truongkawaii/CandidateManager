import React, { useEffect, useState } from 'react';
import { Spin, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams, Link, useHistory } from 'react-router-dom';
import {
  getData,
  getDataCandidate,
  deleteJd,
} from '../../state/actions/table.action';
import ListCandidate from '../ListCandidate';
import { SKILL_CANDIDATE } from '../../constant/constant';

function RecrutmentDetail() {
  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
  const param = useParams();
  const listDataJob = useSelector(state => state.allJobs.data);
  const listDataCandidate = useSelector(state => state.allCandidate.data);
  const dispatch = useDispatch();
  const history = useHistory();
  let detail = <Spin indicator={antIcon} />;

  const [listCandidateSign, setListCandidateSign] = useState(listDataCandidate);
  const [showModal, setShowModal] = useState(false);

  const handleOk = () => {
    setShowModal(false);
    dispatch(deleteJd(param.idRecruitment));
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
      <p>Bạn thật sự muốn xóa Job này ?</p>
    </Modal>
  );
  useEffect(() => {
    if (!listDataJob) {
      dispatch(getData());
    }

    if (!listDataCandidate) {
      dispatch(getDataCandidate());
    }
    if (listDataCandidate && listDataJob) {
      const listCandidateSignUpdated = listDataCandidate.filter(
        item => item.recruitment === param.idRecruitment,
      );
      if (listCandidateSignUpdated.length === 0) {
        setListCandidateSign(null);
      } else setListCandidateSign(listCandidateSignUpdated);
    }
    // detail = listDataJob.filter((item, index) => item.id == param.idRecruitment);

    // const query = new URLSearchParams(location.search);
    // for (let param of query.entries()) {
    //   console.log(param, 'param');
    // }
  }, [listDataCandidate, listDataJob, dispatch, param.idRecruitment]);

  if (listDataJob) {
    detail = listDataJob
      .filter(item => item.id === param.idRecruitment)
      .map(
        ({
          id,
          name,
          position,
          waysofwork,
          experience,
          address,
          description,
          requirements,
          benefits,
          contact,
          // eslint-disable-next-line camelcase
          created_at,
          // eslint-disable-next-line camelcase
          updated_at,
        }) => {
          return (
            <div key={id}>
              <div className="button-option">
                <Link
                  to={{
                    pathname: `/update-job/${id}`,
                  }}
                >
                  Sửa JD
                </Link>
                <Link
                  to={{
                    pathname: `/add-job`,
                  }}
                >
                  Thêm JD mới
                </Link>
                <span
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="delete-jd"
                >
                  Xóa JD
                </span>
              </div>

              <div className="info-details">
                <h1 className="details-title">{name}</h1>
                <h3>Vị trí :</h3>
                <p> {position}</p>
                <h3>Hình thức làm việc : </h3>
                <p>{waysofwork}</p>
                <h3>Yêu cầu kinh nghiệm :</h3>
                <p> {experience}</p>
                <h4>Địa chỉ làm việc : </h4>
                <p>{address}</p>
                <h4>Mô tả công việc :</h4>
                <p> {description}</p>
                <h1>Yêu cầu kĩ năng :</h1>
                <p>
                  {/* eslint-disable-next-line array-callback-return */}
                  {requirements.map(item => {
                    const listSkill = SKILL_CANDIDATE.filter(
                      item2 => item2.id === item,
                    )[0].name;
                    return <span className="skill-item">{listSkill}</span>;
                  })}
                </p>
                <h1>Lợi ích :</h1>
                <p> {benefits}</p>
                <h1>Liên hệ : </h1>
                <p>{contact}</p>
                <h1>Ngày tạo JD :</h1>
                {/* eslint-disable-next-line camelcase */}
                <p> {created_at}</p>
                <h1>Cập nhật mới nhất : </h1>
                {/* eslint-disable-next-line camelcase */}
                <p>{updated_at}</p>
              </div>
              {listCandidateSign ? (
                <div className="list-candidate">
                  <h2>List ứng viên đăng kí :</h2>
                  <ListCandidate listCandidateItem={listCandidateSign} />
                </div>
              ) : (
                <div className="list-candidate">
                  <h2>Không có ứng viên nào đăng kí </h2>
                </div>
              )}
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

export default RecrutmentDetail;
