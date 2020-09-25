// eslint-disable-next-line no-unused-vars
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line no-unused-vars
import { Provider } from 'react-redux';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const storeApp = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

const store = props => {
  return <Provider store={storeApp}>{props.children}</Provider>;
};
sagaMiddleware.run(rootSaga);
export default store;
