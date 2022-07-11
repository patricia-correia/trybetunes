import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'patricia',
      carregando: false,
    };
  }

  componentDidMount() {
    this.setState({ carregando: true });
    getUser()
      .then((username) => this.setState({ carregando: false, username }));
  }

  render() {
    const { username, carregando } = this.state;
    if (carregando) return <Carregando />;
    return (
      <header data-testid="header-component">
        <h1>Trybe Tunes</h1>
        <h3 data-testid="header-user-name">{`Olá, ${username.name}`}</h3>
        <NavLink
          to="/search"
          activeClassName="selected"
          data-testid="link-to-search"
        >
          search
        </NavLink>
        <NavLink
          to="/favorites"
          activeClassName="selected"
          data-testid="link-to-favorites"
        >
          favorites
        </NavLink>
        <NavLink
          exact
          to="/profile"
          activeClassName="selected"
          data-testid="link-to-profile"
        >
          profile
        </NavLink>
      </header>);
  }
}

export default Header;
