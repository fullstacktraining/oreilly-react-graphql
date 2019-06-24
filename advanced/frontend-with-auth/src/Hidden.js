import React, { Component } from 'react';
import activeSession from './ActiveSession';


const HiddenPage = ({ session }) => (
  <div>
    { session && session.me &&  <Hidden session={session} /> }
  </div>
);

class Hidden extends Component {
  render() {
    return (
      <div>
       <p>Hidden page :)</p>
      </div>
    );
  }
}

export default activeSession(HiddenPage);