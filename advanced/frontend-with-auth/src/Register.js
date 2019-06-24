import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER_USER = gql`
mutation register($name: String!, $username: String!, $password: String!) {
  register(name: $name, username: $username, password: $password)
}
`;

const RegisterPage = () => (
  <div>
    <h2>Register</h2>
    <RegisterForm />
  </div>
);

class RegisterForm extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    success: false
  };

  nameChanged = ({ target: { value }}) => {
    this.setState({ name: value });
  }
  usernameChanged = ({ target: { value }}) => {
    this.setState({ username: value });
  }
  passwordChanged = ({ target: { value }}) => {
    this.setState({ password: value });
  }
  resetFields = () => {
    this.setState({ name: '' });
    this.setState({ username: '' });
    this.setState({ password: '' });
    this.setState({ success: false });
  }

  render() {
    const validForm = 
      this.state.name !== '' &&
      this.state.username !== '' &&
      this.state.password !== '';

    return (
      <Mutation mutation={REGISTER_USER}>
      {( register, { loading, error }) => (
        <form
          onSubmit={evt => {
            evt.preventDefault();
            register({
              variables: {
                name: this.state.name,
                username: this.state.username,
                password: this.state.password
              }
            }).then(({ data }) => {
              this.setState({
                success: data.register
              });
            }).catch(error => console.error(error));
            this.resetFields();
          }}
          >
          <label>
            <span>Name</span>
            <input
              type="text"
              value={this.state.name}
              onChange={this.nameChanged}
            />
          </label>
          <label>
            <span>Username</span>
            <input
              type="text"
              value={this.state.username}
              onChange={this.usernameChanged}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={this.state.password}
              onChange={this.passwordChanged}
            />
          </label>
          <div>
            <button disabled={!validForm}>Register</button>
          </div>
          { loading && <p>Adding user...</p> }
          { error && <p>Error, did not register user.</p> }
          { this.state.success && <p>Registration successful.</p> }
          </form>
      )}
      </Mutation>
    );
  }
}

export default RegisterPage;