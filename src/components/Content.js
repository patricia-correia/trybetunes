import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorite from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

export default class Content extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/search" component={ Search } />
          <Route path="/album" component={ Album } />
          <Route path="/favorites" component={ Favorite } />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/:edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}
