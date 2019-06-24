import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const LogoutPage = ({ history }) => (
  <div>
    <LogoutButton history={history} />
  </div>
);

class LogoutButton extends Component {
  logout = async (client) => {
    localStorage.removeItem('token');
    await client.resetStore();
    this.props.history.push('/login');
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <button onClick={() => this.logout(client)}>Logout</button>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(LogoutPage);
export { LogoutButton };