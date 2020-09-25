import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Select } from 'antd';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { SKILL_CANDIDATE } from '../../constant/constant';
import { getData, addNewJD, editNewJD } from '../../state/actions/table.action';

function CustomeJob() {
  const dataList = useSelector(state => state.allJobs.data);
  const dispatch = useDispatch();
  const param = useParams();
  const history = useHistory();
  const [jobUpdate, setJobUpdate] = useState(null);
  const { Option } = Select;

  const skillOption = SKILL_CANDIDATE.map(item => (
    <Option value={item.id} key={item.id}>
      {item.name}
    </Option>
  ));

  const [skill, setSkill] = useState([SKILL_CANDIDATE[0].id]);

  useEffect(() => {
    if (!dataList && param.idJob) {
      dispatch(getData());
    }
    if (param.idJob && dataList) {
      const setJob = () => {
        const jobSelect = dataList.filter(item => item.id === param.idJob)[0];
        setJobUpdate({ ...jobSelect });
        setSkill([...jobSelect.requirements]);
      };
      setJob();
    }
  }, [dataList, param.idJob, dispatch]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Quá ngắn!')
      .max(50, 'Quá dài!')
      .required('Không được để trống!'),
    position: Yup.string()
      .min(3, 'Quá ngắn!')
      .max(50, 'Quá dài!')
      .required('Không được để trống!'),
    waysofwork: Yup.string()
      .min(3, 'Quá ngắn!')
      .max(50, 'Quá dài!')
      .required('Không được để trống!'),
    experience: Yup.string()
      .min(10, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
    address: Yup.string()
      .min(20, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
    description: Yup.string()
      .min(30, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
    benefits: Yup.string()
      .min(20, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
    contact: Yup.string()
      .min(3, 'Quá ngắn!')
      .max(500, 'Quá dài!')
      .required('Không được để trống!'),
  });

  const handlerChangeSkill = values => {
    setSkill(values);
    setJobUpdate({ ...jobUpdate, requirements: values });
  };

  return (
    <Formik
      initialValues={{
        name: jobUpdate ? jobUpdate.name : '',
        position: jobUpdate ? jobUpdate.position : '',
        waysofwork: jobUpdate ? jobUpdate.waysofwork : '',
        experience: jobUpdate ? jobUpdate.experience : '',
        address: jobUpdate ? jobUpdate.address : '',
        description: jobUpdate ? jobUpdate.description : '',
        requirements: jobUpdate ? jobUpdate.requirements : skill,
        benefits: jobUpdate ? jobUpdate.benefits : '',
        contact: jobUpdate ? jobUpdate.contact : '',
        created_at: jobUpdate
          ? jobUpdate.created_at
          : dateFormat(new Date(), 'dddd, d - m - yyyy, h:MM:ss TT'),
        updated_at: dateFormat(new Date(), 'dddd, d - m - yyyy, h:MM:ss TT'),
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values, 'values');
        if (param.idJob) {
          dispatch(editNewJD({ ...values, id: jobUpdate.id }));
          history.push('/recruitment');
        } else {
          dispatch(addNewJD(values));
          history.push('/recruitment');
        }
      }}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form>
          <div className="add-job">
            <div className="container">
              <div className="add-job-title">
                {param.idJob ? <h1>Sửa Job</h1> : <h1>Thêm 1 Job mới</h1>}
              </div>

              <div className="long-input">
                <h4>Đợt tuyển dụng</h4>
                <Field name="name" />
                {errors.name && touched.name ? (
                  <div className="notice-err">{errors.name}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Vị trí tuyển dụng</h4>
                <Field name="position" />
                {errors.position && touched.position ? (
                  <div className="notice-err">{errors.position}</div>
                ) : null}
              </div>
              <div className="long-input">
                <h4>Kỹ năng yêu cầu</h4>
                {/* <Field name="requirements" />
                {errors.requirements && touched.requirements ? (
                  <div className="notice-err">{errors.requirements}</div>
                ) : null} */}
                <Select
                  onChange={handlerChangeSkill}
                  mode="multiple"
                  // allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  value={skill}
                >
                  {skillOption}
                </Select>
              </div>

              <div className="long-input">
                <h4>Kinh nghiệm yêu cầu</h4>
                <Field name="experience" />
                {errors.experience && touched.experience ? (
                  <div className="notice-err">{errors.experience}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Hình thức làm việc</h4>
                <Field name="waysofwork" />
                {errors.waysofwork && touched.waysofwork ? (
                  <div className="notice-err">{errors.waysofwork}</div>
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
                <h4>Mô tả công việc</h4>
                <Field component="textarea" name="description" />
                {errors.description && touched.description ? (
                  <div className="notice-err">{errors.description}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Lợi ích</h4>
                <Field component="textarea" name="benefits" />
                {errors.benefits && touched.benefits ? (
                  <div className="notice-err">{errors.benefits}</div>
                ) : null}
              </div>

              <div className="long-input">
                <h4>Liên hệ</h4>
                <Field component="textarea" name="contact" />
                {errors.contact && touched.contact ? (
                  <div className="notice-err">{errors.contact}</div>
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

export default CustomeJob;
