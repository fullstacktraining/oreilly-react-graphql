import React, { Component } from 'react';
import activeSession from './ActiveSession';
import gql from 'graphql-tag';
import { client } from './index';
import { Query } from 'react-apollo';

const UPLOAD_FILE = gql`
mutation($filename: String!) {
  uploadImage(filename: $filename)
}
`;

const ProfilePage = ({ session }) => (
  <div>
    { session && session.me &&  <Profile session={session} /> }
  </div>
);

class Profile extends Component {
  state = {
    selectedFile: null,
    photoUrl: this.props.session.me.photo ? this.props.session.me.photo : null,
    temporaryProfileHolder: null
  };

  USER_QUERY = gql`{
    user(id: ${this.props.session.me.id}) {
      photo(options:"200,200,face,max")
    }
  }`

  handleSelectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      temporaryProfileHolder: null
    });
  }

  handleUpload = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile, this.state.selectedFile.name);

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      mode: 'cors',
      body: data
    })
    .then(response => response.json())
    .then(async filename => {
      await client.mutate({
        variables: { filename },
        mutation: UPLOAD_FILE
      });
      const { data } = await client.query({
        query: this.query,
        fetchPolicy: 'no-cache'
      });
      this.setState({
        temporaryProfileHolder: data.user.photo
      });
    })
    .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <h2>Hello again, {this.props.session.me.name}!</h2>
        <Query query={this.USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading profile photo ... </p>
          if (error) return <p>Error ...</p>
          if (data.user.photo) {
            return <img src={data.user.photo} alt="" />
          } else if (this.state.temporaryProfileHolder) {
            return <img src={this.state.temporaryProfileHolder} alt="" />
          } else {
            return <img src="https://res.cloudinary.com/tamas-demo/image/upload/w_100,h_100,c_thumb,g_face,r_20/avatar.png" alt="" />
          }
        }}
        </Query>
        <p>Upload a profile photo: <input type="file" onChange={this.handleSelectedFile} /><button onClick={this.handleUpload}>Upload</button></p>

        <p>List of cars:</p>
        <ul>{this.props.session.me.car.length !== 0 ?
          this.props.session.me.car.map(( { id, make, model }) => <li key={`${id}-${make}`}>{make} {model}</li> ) :
          <li>No car</li>}
        </ul>
      </div>
    );
  }
}

export default activeSession(ProfilePage);