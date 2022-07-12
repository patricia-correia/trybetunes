import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  getFavoriteSongs = async () => {
    const { trackId } = this.props;
    this.setState((prevState) => ({ favorite: !prevState, loading: true }),
      async () => {
        const theObjectOfMusic = await getMusics(trackId);
        await addSong(theObjectOfMusic);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    return (
      <section>
        <div>
          <p>
            {' '}
            { trackName }
          </p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <div>
          <form>
            <label
              htmlFor={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
            >
              Favorita
              <input
                name="favorite"
                onChange={ this.handleChange }
                checked={ favorite }
                onClick={ this.getFavoriteSongs }
                id={ trackId }
                type="checkbox"
              />
            </label>
            {
              loading && <Carregando />
            }
          </form>
        </div>
      </section>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
