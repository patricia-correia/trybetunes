import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      loading: false,
      findResult: [],
      hander: false,
      artistFind: '',
    };
  }

  handelInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateLogin = () => {
    const minimoCharacter = 2;
    const { artistName } = this.state;
    if (artistName.length >= minimoCharacter) {
      return false;
    }
    return true;
  }

  onClick = () => {
    const { artistName } = this.state;
    this.setState(
      { loading: true }, async () => {
        const result = await searchAlbumsAPI(artistName);
        this.setState({
          artistFind: artistName,
          artistName: '',
          findResult: result,
          hander: true,
          loading: false,
        });
      },
    );
  }

  render() {
    const { artistName,
      loading, findResult,
      hander, artistFind } = this.state;
    const searchResult = (
      <div>
        <label htmlFor="search">
          <input
            data-testid="search-artist-input"
            name="artistName"
            value={ artistName }
            id="search"
            placeholder="search artist name"
            onChange={ this.handelInput }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ this.validateLogin() }
          onClick={ this.onClick }
        >
          Pesquisar
        </button>
      </div>
    );
    const showdResult = (
      <span>
        { findResult.length === 0
          ? 'Nenhum álbum foi encontrado' : `Resultado de álbuns de: ${artistFind}` }
      </span>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          {
            loading ? <Carregando /> : searchResult
          }
          {
            hander ? showdResult : null
          }
        </div>
        <div>
          {
            findResult.map((album) => (
              <Link
                to={ `album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
              >
                <img
                  src={ album.artworkUr100 }
                  alt={ album.collectionName }
                />
                <p>
                  {' '}
                  { album.collectionName }
                </p>
                <span>
                  { album.artistName }
                </span>
              </Link>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Search;
