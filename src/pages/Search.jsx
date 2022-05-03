import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      artist: '',
      isButtonDisabled: true,
      albums: [],
      notFound: false,
      loading: false,
    };
  }

  searchChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    }, () => {
      const { searchInput } = this.state;
      const minValue = 2;

      if (searchInput.length >= minValue) {
        this.setState({ isButtonDisabled: false });
      } else {
        this.setState({ isButtonDisabled: true });
      }
    });
  }

  onButtonClick = async () => {
    const { searchInput } = this.state;

    this.setState({
      artist: searchInput,
      searchInput: '',
      loading: true,
    });

    const fetchAlbums = await searchAlbumsAPI(searchInput);

    if (fetchAlbums.length > 0) {
      this.setState({
        albums: fetchAlbums,
        loading: false,
        notFound: false,
      });
    } else {
      this.setState({
        albums: '',
        loading: false,
        notFound: true,
      });
    }
  }

  renderAlbums = () => {
    const { artist, albums } = this.state;

    return (
      <div className="results-div">
        <h4>
          {`Resultado de álbuns de: ${artist}`}
        </h4>

        <div className="albums-div">
          {albums.map(({ artistName,
            artworkUrl100,
            collectionName,
            releaseDate,
            collectionPrice,
            collectionId,
          }) => (
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
              key={ collectionId }
            >
              <div className="album-div">
                <h3>{ artistName }</h3>
                <div>
                  <img src={ artworkUrl100 } alt="" srcSet="" />
                </div>
                <h4>{ collectionName }</h4>
                <h6>{ releaseDate }</h6>
                <h5>{ collectionPrice }</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { searchInput, isButtonDisabled, albums, loading, notFound } = this.state;
    // console.log(albums)
    return (
      <div data-testid="page-search" className="page-div">
        {/* <h1>Esse é o container do Search</h1> */}

        <form action="" className="search-div">
          {loading ? <Loading /> : (
            <div>
              <h4>Search a song!</h4>
              <input
                type="text"
                name="searchInput"
                id=""
                value={ searchInput }
                onChange={ this.searchChangeHandler }
                placeholder="Nome do artista"
                data-testid="search-artist-input"
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.onButtonClick }
              >
                Pesquisar
              </button>
            </div>
          )}
        </form>
        <div>
          { (notFound) && <h4>Nenhum álbum foi encontrado</h4> }
          { (albums.length > 0) && this.renderAlbums() }
        </div>
      </div>
    );
  }
}
