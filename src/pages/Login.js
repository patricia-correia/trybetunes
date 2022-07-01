import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

const minimoCharacter = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      carregando: false,
    };
  }

  loading = () => {
    this.setState((prevState) => ({
      carregando: !prevState.carregando,
    }));
  }

  handelInput = ({ target }) => this.setState({ name: target.value });

  userValidation = async ({ name }) => {
    const { history } = this.props;
    this.loading();
    await createUser({ name });
    history.push('/search');
  }

  render() {
    const { name, carregando } = this.state;
    const validateLogin = name.length >= minimoCharacter;
    if (carregando) return <Carregando />;

    return (
      <div data-testid="page-login">
        <fildset>
          Login
          <label htmlFor="login">
            Name:
            <input
              data-testid="login-name-input"
              type="text"
              name="login"
              onChange={ this.handelInput }
            />
          </label>
          <button
            type="submit"
            onClick={ () => this.userValidation({ name }) }
            disabled={ !validateLogin }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </fildset>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
