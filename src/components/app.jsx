import React, { Component } from 'react';
import '../styles/app.css';
import Login from './login';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      gAuthInstance: null,
      authenticatedUser: null,
    };

    this.handleAuthorization = this.handleAuthorization.bind(this);
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        'apiKey': process.env.GOOGLE_API_KEY,
        'clientId': process.env.GOOGLE_CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/youtube',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
      })
        .then(() => {
          const gAuthInstance = window.gapi.auth2.getAuthInstance();
          this.setState({ gAuthInstance });

          gAuthInstance.isSignedIn.listen(this.handleAuthorization);
          this.handleAuthorization();
        })
        .catch(error => console.log(error));
    });
  }

  handleAuthorization() {
    this.setState({
      authenticatedUser: this.state.gAuthInstance.currentUser.get(),
    });
  }

  render() {
    const { authenticatedUser, gAuthInstance } = this.state;
    return (

      <div className="app">
        { authenticatedUser ? (
          <div>You are logged in!</div>
        ) : (
          <Login gAuthInstance={gAuthInstance} />
        )
      }
      </div>
    );
  }
}


export default App;
