import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      logado: false,
    };
  }

  componentDidMount() {
    // console.log('componentDidMount');
    this.fetchUserName();
  }

  componentDidUpdate() {
    this.fetchUserName();
  }

  componentWillUnmount() {
    this.fetchUserName();
  }

  fetchUserName = async () => {
    const userName = await getUser().then((response) => response.name);

    this.setState({
      userName,
      logado: true,
    });
  }

  welcome = (userName) => (
    <h3 data-testid="header-user-name">
      Bem vindo
      {` ${userName}`}
    </h3>
  )

  render() {
    const { userName, logado } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <div className="links-div">
          <Link to="/"><h4>Login</h4></Link>
          <Link to="/search" data-testid="link-to-search"><h4>Search</h4></Link>
          <Link to="/album/:id"><h4>Album</h4></Link>
          <Link to="/favorites" data-testid="link-to-favorites"><h4>Favorites</h4></Link>
          <Link to="/profile" data-testid="link-to-profile"><h4>Profile</h4></Link>
          <Link to="/profile/edit"><h4>ProfileEdit</h4></Link>

          {logado ? this.welcome(userName) : <Loading />}
        </div>
      </header>
    );
  }
}
