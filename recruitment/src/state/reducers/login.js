import { Actions } from '../actions';

const initialState = {
  isLoggedIn: false,
  isError: false,
  message: '',
  token: localStorage.getItem('tokens'),
  showLoadingButton: false,
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.USER_LOGIN:
      return {
        ...state,
        showLoadingButton: true,
        token: localStorage.getItem('tokens'),
      };
    case Actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isError: false,
        token: action.payload.token,
        message: 'Đăng nhập thành công',
        showLoadingButton: false,
      };
    case Actions.USER_LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        isError: true,
        token: action.payload.token,
        message: action.payload,
        showLoadingButton: false,
      };
    case Actions.USER_LOGOUT:
      return {
        ...state,
        token: '',
        isLoggedIn: false,
        isError: false,
        message: 'Bạn vừa đăng xuất',
      };
    default:
      return { ...state };
  }
}
export default loginReducer;
