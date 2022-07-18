import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.checkedCheckbox();
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  getFaveSongs = async () => {
    this.setState((prevState) => ({ favorite: !prevState, loading: true }),
      async () => {
        const { favoriteList, previewUrl, trackId, trackName } = this.props;
        const { favorite } = this.state;
        if (favorite) {
          await addSong({
            previewUrl,
            trackId,
            trackName,
          });
        } else {
          favoriteList();
          await removeSong({
            previewUrl,
            trackId,
            trackName,
          });
        }
        favoriteList();
        this.setState({
          loading: false,
        });
      });
  }

  checkedCheckbox = () => {
    const { favoritedSongs, trackId } = this.props;
    const check = favoritedSongs.some((track) => track.trackId === trackId);
    this.setState({ favorite: check });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    const shower = (
      <div>
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
                onClick={ this.getFaveSongs }
                id={ trackId }
                type="checkbox"
              />
            </label>
          </form>
        </div>
      </div>
    );
    return (
      <section>
        {
          loading ? <Carregando /> : shower
        }
      </section>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteList: PropTypes.func.isRequired,
  favoritedSongs: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default MusicCard;
