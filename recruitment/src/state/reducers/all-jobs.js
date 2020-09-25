import { Actions } from '../actions';

const initialState = {
  data: null,
  paginationData: null,
  initialNews: 4,
};

const allJobs = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_DATA_JD_SUCCESS: {
      const { payload: data } = action;
      const pagiData = data.slice(0, state.initialNews);
      return {
        ...state,
        data,
        paginationData: pagiData,
      };
    }
    case Actions.PAGINATION_DATA: {
      const { payload: orderPage = 1 } = action;
      const newData = [...state.data];
      const begin = (orderPage - 1) * state.initialNews;
      const end = orderPage * state.initialNews;
      const newDataUpdate = newData.slice(begin, end);
      return {
        ...state,
        paginationData: newDataUpdate,
      };
    }

    default:
      return state;
  }
};

export default allJobs;
