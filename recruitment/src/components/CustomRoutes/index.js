import React, { Fragment } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Header from '../Header';
import ListOptions from '../ListOptions';

export const customRoutes = (path, MyComponent) => {
  const token = localStorage.getItem('tokens');
  // if (token == null || token === '') {
  //   return <Redirect to="/recruitment" />;
  // }
  if (path !== '/signup' && path !== '/login') {
    return (
      <Fragment>
        <Header />
        <div className="row">
          <div className="col-lg-2 col-2">
            <ListOptions />
          </div>
          <div className="col-lg-10 col-10">
            <MyComponent />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <MyComponent />
      </Fragment>
    );
  }
};
