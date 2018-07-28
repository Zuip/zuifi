import React from 'react';
import { Route, Switch } from 'react-router-dom'

import About from '../About/About';
import Article from '../Article/Article';
import Category from '../Category/Category';
import CategoryFirstPage from '../Category/CategoryFirstPage';
import FrontPage from '../FrontPage/FrontPage';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage';

class Routes extends React.Component {

  render() {
    return (
      <div id="navigation-content">
        <Switch>
          <Route exact component={FrontPage} path="/" />
          <Route exact component={About} path="/about" />
          <Route exact component={Article} path="/trips/:tripURLName/:countryUrlName/:cityUrlName/article" />
          <Route exact component={CategoryFirstPage} path="/categories/:categoryURLName" />
          <Route exact component={Category} path="/categories/:categoryURLName/pages/:page" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Profile} path="/profile" />
          <Route exact component={Profile} path="/profile/:user" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
