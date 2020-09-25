import { call, put, takeLatest, all } from 'redux-saga/effects';
import { Actions, getDataSuccess } from '../actions';
import TableService from '../../services/table.services';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions

function* fetchAllJD() {
  try {
    const allJd = yield call(TableService.listJob);
    yield put(getDataSuccess(allJd));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* fetchAllCandidate() {
  try {
    const allCandidate = yield call(TableService.listCandidate);
    yield put({
      type: Actions.GET_DATA_CANDIDATE_SUCCESS,
      payload: allCandidate,
    });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}
function* postDataJD(action) {
  try {
    yield call(TableService.addJob, action.payload);
    const allJd = yield call(TableService.listJob);
    yield put(getDataSuccess(allJd));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}
function* putDataJD(action) {
  try {
    yield call(TableService.editJob, action.payload);
    const allJd = yield call(TableService.listJob);
    yield put(getDataSuccess(allJd));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}
function* deleteDataJD(action) {
  try {
    yield call(TableService.deleteJob, action.payload);
    const allJd = yield call(TableService.listJob);
    yield put(getDataSuccess(allJd));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* putDataCandidate(action) {
  try {
    console.log(action, 'action nè');
    yield call(TableService.editCandidate, action.payload);

    const allCandidate = yield call(TableService.listCandidate);
    yield put({
      type: Actions.GET_DATA_CANDIDATE_SUCCESS,
      payload: allCandidate,
    });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}
function* postDataCandidate(action) {
  try {
    console.log(action, 'action nè');
    yield call(TableService.addCandidate, action.payload);

    const allCandidate = yield call(TableService.listCandidate);
    yield put({
      type: Actions.GET_DATA_CANDIDATE_SUCCESS,
      payload: allCandidate,
    });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}
function* deleteDataCandidate(action) {
  try {
    yield call(TableService.deleteCandidate, action.payload);
    const allCandidate = yield call(TableService.listCandidate);
    yield put(getDataSuccess(allCandidate));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}
function* mySaga() {
  yield takeLatest(Actions.GET_DATA_JD, fetchAllJD);
  yield takeLatest(Actions.GET_DATA_CANDIDATE, fetchAllCandidate);
  yield takeLatest(Actions.ADD_DATA_JD, postDataJD);
  yield takeLatest(Actions.EDIT_DATA_JD, putDataJD);
  yield takeLatest(Actions.DELETE_DATA_JD, deleteDataJD);
  yield takeLatest(Actions.EDIT_DATA_CANDIDATE, putDataCandidate);
  yield takeLatest(Actions.ADD_DATA_CANDIDATE, postDataCandidate);
  yield takeLatest(Actions.DELETE_DATA_CANDIDATE, deleteDataCandidate);
}

export default function* rootSaga() {
  yield all([mySaga()]);
}
