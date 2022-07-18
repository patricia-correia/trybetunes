import React from 'react';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      listFavoriteSongs: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.showerListOfFavoriteSongs();
  }

  showerListOfFavoriteSongs = async () => {
    this.setState(
      { loading: false },
      async () => {
        const getFave = await getFavoriteSongs();
        this.setState({
          listFavoriteSongs: getFave,
          loading: false,
        });
      },
    );
  }

  render() {
    const { listFavoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <section>
          {
            loading ? <Carregando />
              : listFavoriteSongs.map((favoritedMusic) => (
                <MusicCard
                  trackName={ favoritedMusic.trackName }
                  previewUrl={ favoritedMusic.previewUrl }
                  trackId={ favoritedMusic.trackId }
                  key={ favoritedMusic.trackId }
                  favoriteList={ this.showerListOfFavoriteSongs }
                  favoritedSongs={ listFavoriteSongs }
                />))
          }
        </section>
      </div>
    );
  }
}
export default Favorites;
