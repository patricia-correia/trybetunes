import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      handleAlbum: [],
      indexValue: [],
    };
  }

  componentDidMount() {
    this.getMusicApi();
  }

  getMusicApi = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicsTheAlbum = await getMusics(id);
    this.setState({
      handleAlbum: musicsTheAlbum,
      indexValue: musicsTheAlbum[0],
    });
  }

  render() {
    const { handleAlbum, indexValue } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          <section>
            <img src={ indexValue.artworkUrl100 } alt={ indexValue.collectionName } />
            <p data-testid="album-name">
              {' '}
              { indexValue.collectionName }
              {' '}
            </p>
            <p data-testid="artist-name">
              {' '}
              { indexValue.artistName }
              {' '}
            </p>
          </section>
        }

        {
          handleAlbum.slice(1).map((music) => (
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              key={ music.trackName }
            />
          ))
        }
      </div>);
  }
}

Album.defaultProps = {
  match: {},
};

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default Album;
