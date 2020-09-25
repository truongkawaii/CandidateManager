import Actions from './action.type';

export const getData = () => ({
  type: Actions.GET_DATA_JD,
});

export const getDataSuccess = payload => ({
  type: Actions.GET_DATA_JD_SUCCESS,
  payload,
});
export const getDataCandidate = () => ({
  type: Actions.GET_DATA_CANDIDATE,
});

export const getDataCandidateSuccess = payload => ({
  type: Actions.GET_DATA_CANDIDATE_SUCCESS,
  payload,
});
export const addNewJD = payload => ({
  type: Actions.ADD_DATA_JD,
  payload,
});

export const editNewJD = payload => ({
  type: Actions.EDIT_DATA_JD,
  payload,
});

export const deleteJd = payload => ({
  type: Actions.DELETE_DATA_JD,
  payload,
});
export const postNewCandidate = payload => ({
  type: Actions.ADD_DATA_CANDIDATE,
  payload,
});
export const editCandidate = payload => ({
  type: Actions.EDIT_DATA_CANDIDATE,
  payload,
});
export const deleteCandidate = payload => ({
  type: Actions.DELETE_DATA_CANDIDATE,
  payload,
});
export const paginationDataJobs = payload => ({
  type: Actions.PAGINATION_DATA,
  payload,
});
// Handler token
export const redirectLoginTokenExp = () => {
  return {
    type: Actions.REDIRECT_LOGIN_TOKEN_EXP,
  };
};
