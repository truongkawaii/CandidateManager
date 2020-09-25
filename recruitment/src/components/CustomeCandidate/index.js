import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import * as Yup from 'yup';
import {
  getDataCandidate,
  editCandidate,
  getData,
  postNewCandidate,
} from '../../state/actions/table.action';
import { STATUS_CANDIDATE } from '../../constant/constant';

function CustomeCandidate() {
  const dataListCandidate = useSelector(state => state.allCandidate.data);
  const dataListJobs = useSelector(state => state.allJobs.data);
  const dispatch = useDispatch();
  const param = useParams();
  const history = useHistory();
  const [candidateUpdate, setCandidateUpdate] = useState(null);
  let listOreview = null;
  let listRecruitmentSelect = null;

  useEffect(() => {
    if (!dataListJobs) {
      dispatch(getData());
    }
    if (!dataListCandidate && param.idCandidate) {
      dispatch(getDataCandidate());
    }
    if (param.idCandidate && dataListCandidate) {
      const setCandidate = () => {
        const candidateSelect = dataListCandidate.filter(
          item => item.id === param.idCandidate,
        )[0];
        setCandidateUpdate({ ...candidateSelect });
      };
      setCandidate();
    }
  }, [dataListCandidate, dispatch, param.idCandidate, dataListJobs]);
  // Check candidate exist to set oreview
  if (candidateUpdate) {
    listOreview = STATUS_CANDIDATE.map(item => {
      if (item.statusId === candidateUpdate.status) {
        return (
          <option selected="selected" key={item.statusId} value={item.statusId}>
            {item.value}
          </option>
        );
      } else
        return (
          <option key={item.statusId} value={item.statusId}>
            {item.value}
          </option>
        );
    });
  } else {
    listOreview = STATUS_CANDIDATE.map(item => {
      return (
        <option key={item.statusId} value={item.statusId}>
          {item.value}
        </option>
      );
    });
  }

  // Create select Job
  if (dataListJobs && candidateUpdate) {
    listRecruitmentSelect = dataListJobs.map(item => {
      if (item.id === candidateUpdate.id)
        return (
          <option selected="selected" key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      else
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
    });
  } else if (dataListJobs) {
    listRecruitmentSelect = dataListJobs.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  }
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Quá ngắn!')
      .max(50, 'Quá dài!')
      .required('Không được để trống!'),
    birthday: Yup.string()
      .min(3, 'Quá ngắn!')
      .max(50, 'Quá dài!')
      .required('Không được để trống!'),
    phone: Yup.string()
      .min(5, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
    address: Yup.string()
      .min(5, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
    email: Yup.string()
      .min(5, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
    position_apply: Yup.string()
      .min(5, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
    note: Yup.string()
      .min(3, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
  });

  return (
    <Formik
      initialValues={{
        name: candidateUpdate ? candidateUpdate.name : '',
        birthday: candidateUpdate ? candidateUpdate.birthday : '',
        phone: candidateUpdate ? candidateUpdate.phone : '',
        email: candidateUpdate ? candidateUpdate.email : '',
        address: candidateUpdate ? candidateUpdate.address : '',
        job_apply: candidateUpdate
          ? candidateUpdate.recruitment
          : dataListJobs
          ? dataListJobs[0].id
          : '',
        position_apply: candidateUpdate ? candidateUpdate.position_apply : '',
        note: candidateUpdate ? candidateUpdate.note : '',
        status: candidateUpdate
          ? candidateUpdate.status
          : STATUS_CANDIDATE[0].statusId,
        created_at: candidateUpdate
          ? candidateUpdate.created_at
          : dateFormat(new Date(), 'dddd, d - m - yyyy, h:MM:ss TT'),
        updated_at: dateFormat(new Date(), 'dddd, d - m - yyyy, h:MM:ss TT'),
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        const nameJob = dataListJobs.filter(
          item => item.id === values.job_apply,
        )[0];
        console.log(values, 'values');
        console.log(nameJob, 'nameJob');
        if (param.idCandidate) {
          dispatch(
            editCandidate({
              ...values,
              id: candidateUpdate.id,
              recruitment: values.job_apply,
              job_apply: nameJob.name,
            }),
          );
        } else {
          dispatch(
            postNewCandidate({
              ...values,
              recruitment: values.job_apply,
              job_apply: nameJob.name,
            }),
          );
        }
        history.push('/candidate');
      }}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form>
          <div className="add-job">
            <div className="container">
              <div className="add-job-title">
                {param.idCandidate ? (
                  <h1>Sửa ứng viên</h1>
                ) : (
                  <h1>Thêm 1 ứng viên mới</h1>
                )}
              </div>

              <div className="long-input">
                <h4>Tên ứng viên</h4>
                <Field name="name" />
                {errors.name && touched.name ? (
                  <div className="notice-err">{errors.name}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Ngày sinh</h4>
                <Field name="birthday" type="input" />
                {errors.birthday && touched.birthday ? (
                  <div className="notice-err">{errors.birthday}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Số điện thoại</h4>
                <Field name="phone" />
                {errors.phone && touched.phone ? (
                  <div className="notice-err">{errors.phone}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Email</h4>
                <Field name="email" />
                {errors.email && touched.email ? (
                  <div className="notice-err">{errors.email}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Vị trí ứng tuyển</h4>
                <Field name="position_apply" />
                {errors.position_apply && touched.position_apply ? (
                  <div className="notice-err">{errors.position_apply}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Địa chỉ</h4>
                <Field component="textarea" name="address" />
                {errors.address && touched.address ? (
                  <div className="notice-err">{errors.address}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Job ứng tuyển</h4>
                <Field as="select" name="job_apply">
                  {listRecruitmentSelect}
                </Field>
                {errors.job_apply && touched.job_apply ? (
                  <div className="notice-err">{errors.job_apply}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Quy trình ứng tuyển</h4>
                <Field as="select" name="status">
                  {listOreview}
                </Field>
                {errors.status && touched.status ? (
                  <div className="notice-err">{errors.status}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Ghi chú</h4>
                <Field component="textarea" name="note" />
                {errors.note && touched.note ? (
                  <div className="notice-err">{errors.note}</div>
                ) : null}
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CustomeCandidate;
