import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { routes } from './constant/routes';
import LayOut from './common/Layout';
import './assets/css/main.css';
import './assets/css/grid.css';
import './assets/css/resset.css';
import 'antd/dist/antd.css';
import { customRoutes } from './components/CustomRoutes';

function App() {
  const tokenCheck = useSelector(state => state.tokenExpState);
  let token = localStorage.getItem('tokens');

  useEffect(() => {
    if (token) {
      console.log('run');
      let decode = jwtDecode(token);
      // dispatch(getMyInformation(decode.userId));
    }

    if (tokenCheck.tokenExp === false) {
      console.log(tokenCheck, 'tokenExp');
      // return <Redirect to="/login" />;
    }
    return () => {};
  }, []);
  const renderRoutes = () =>
    _.map(routes, ({ path, exact, component: MyComponent, name }) => (
      <Route key={path} path={path} exact={exact}>
        <LayOut name={name}>{customRoutes(path, MyComponent)}</LayOut>
      </Route>
    ));

  return (
    <Router>
      {token === '' || token == null ? <Redirect to="/login" /> : null}
      <Switch>{renderRoutes()}</Switch>
    </Router>
  );
}

export default React.memo(App);
