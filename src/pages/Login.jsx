import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isButtonDisabled: true,
      loading: false,
      isUserAuthenticated: false,
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    }, () => this.loginValidation());
  }

  loginValidation = () => {
    const { name } = this.state;
    const minValue = 3;

    if (name.length >= minValue) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  enterButton = async () => {
    const { name } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });

      this.setState({
        loading: false,
        isUserAuthenticated: true,
      });
    });
  }

  render() {
    const { isButtonDisabled, loading, isUserAuthenticated } = this.state;
    return (
      <div data-testid="page-login" className="page-div">
        {/* <h3>Esse é o container do Login</h3> */}

        <form action="">
          <fieldset>
            <legend>Login</legend>
            <label htmlFor="login-submit-button">
              Name:
              <input
                type="text"
                name="name"
                onChange={ this.onChangeHandler }
                data-testid="login-name-input"
                id="login-submit-button"
              />
            </label>

            <div>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ isButtonDisabled }
                onClick={ this.enterButton }
              >
                Entrar
              </button>
            </div>

            <div>
              { loading ? <Loading /> : <p/> }
            </div>

            { isUserAuthenticated ? <Redirect to="/search" /> : <p /> }
          </fieldset>
        </form>
      </div>
    );
  }
}
