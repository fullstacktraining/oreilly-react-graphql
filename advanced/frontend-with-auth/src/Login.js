import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
`;

const LoginPage = ({ history, refetch }) => (
  <div>
    <h2>Login</h2>
    <LoginForm history={history} refetch={refetch} />
  </div>
)

class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  usernameChanged = ({ target: { value }}) => {
    this.setState({ username: value });
  }
  passwordChanged = ({ target: { value }}) => {
    this.setState({ password: value });
  }

  submitForm = (event, login) => {
    event.preventDefault();
    login({
      variables: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(async ({ data }) => {
      localStorage.setItem('token', data.login.token);
      await this.props.refetch();
      this.props.history.push('/profile');
    }).catch(error => console.error(error));
  };

  render() {
    const validForm =
      this.state.username !== '' &&
      this.state.password !== '';
    return (
      <Mutation mutation={LOGIN_USER}>
      {( login, { loading, error }) => (
        <form onSubmit={evt => this.submitForm(evt, login)}>
        <label>
            <span>Username</span>
            <input
              type="text"
              autoComplete="username"
              value={this.state.username}
              onChange={this.usernameChanged}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.passwordChanged}
            />
          </label>
          <div>
            <button disabled={!validForm}>Login</button>
          </div>
        </form>
      )}
      </Mutation>
    )
  }
}
export default withRouter(LoginPage);