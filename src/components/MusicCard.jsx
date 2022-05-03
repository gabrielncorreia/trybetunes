import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      checked: true,
    };
  }

  favoriteCheckboxHandler = (event) => {
    const { checked } = this.state;
    // const value = event.target.checked;
    event.target.checked = checked;

    this.setState({ checked: !checked });

    // console.log(value);

    this.setState({ loading: true }, async () => {
      const addingSongToFav = await addSong({ ...this.props });
      if (addingSongToFav === 'OK') return this.setState({ loading: false });
    });
  };

  render() {
    const { trackName, previewUrl, trackId, isChecked } = this.props;
    const { loading } = this.state;
    return (
      <div className="music-card">
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name={ `checkbox-music-${trackId}` }
            checked={ isChecked }
            onClick={ this.favoriteCheckboxHandler }
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
        {loading ? <Loading /> : null}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
};

MusicCard.defaultProps = {
  previewUrl: '',
  trackName: '',
  trackId: '',
};
