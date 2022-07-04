import React from 'react';
import Header from '../components/Header';

const minimoCharacter = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  handelInput = ({ target }) => this.setState({ name: target.value });

  render() {
    const { name } = this.state;
    const validateLogin = name.length >= minimoCharacter;
    return (
      <div data-testid="page-search">
        <Header />

        <label htmlFor="search">
          <input
            data-testid="search-artist-input"
            name="search"
            placeholder="search"
            onChange={ this.handelInput }
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ !validateLogin }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
