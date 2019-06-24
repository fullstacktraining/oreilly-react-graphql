import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div>
       <p>Error occured: { this.props.message }</p>
      </div>
    );
  }
}

export default Error;