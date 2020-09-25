import { combineReducers } from 'redux';
import allJobsReducer from './all-jobs';
import allCandidateReducer from './all-candidate';
import tokenExpReducer from './tokenExp';

// Combine reducer
const rootReducer = combineReducers({
  allJobs: allJobsReducer,
  allCandidate: allCandidateReducer,
  tokenExpState: tokenExpReducer,
});

export default rootReducer;
