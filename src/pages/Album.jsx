import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true,
      artistsName: '',
      albumName: '',
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchSongs();
    this.fetchFavoriteSong();
  }

  fetchSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const songsFetched = await getMusics(id);

    this.setState({
      songs: songsFetched.slice(1),
      loading: false,
      artistsName: songsFetched[0].artistName,
      albumName: songsFetched[0].collectionCensoredName,
    });
  }

  fetchFavoriteSong = async () => {
    const favoriteSongs = await getFavoriteSongs();
    const filteredIds = favoriteSongs.map((song) => song.trackId);

    this.setState({
      favoriteSongs: filteredIds,
    });
  }

  shouldBeChecked = (id) => {
    const { favoriteSongs } = this.state;

    if (favoriteSongs.includes(id) === false) {
      return null;
    }

    return true;
  }

  render() {
    const { songs, loading, artistsName, albumName } = this.state;
    // console.log(songs);
    return (
      <div data-testid="page-album" className="page-div">
        {/* <h1>Esse é o container do Album</h1> */}

        <h2 data-testid="artist-name">{artistsName}</h2>
        <h3 data-testid="album-name">{`Collection Name: ${albumName}`}</h3>

        {loading ? <Loading /> : songs.map(({
          trackName,
          previewUrl,
          trackId,
        }) => (
          <div key={ trackId }>
            <MusicCard
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              isChecked={ this.shouldBeChecked(trackId) }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
