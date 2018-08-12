import React from 'react';

class Playlists extends React.Component {
  constructor() {
    super();

    this.state = {
      playlists: [],
    };
  }

  componentDidMount() {
    const youtube = window.gapi.client.youtube;

    youtube.channels.list({
      part: 'id',
      mine: 'true',
    }).then(response => {
      const result = response.result;

      if (!result.items || !result.items.length) {
        return;
      }

      const channelId = result.items[0].id;

      window.gapi.client.youtube.playlists.list({
        channelId,
        maxResults: 25,
        part: 'snippet, contentDetails',
      }).then(res => {
        this.setState({
          playlists: res.result.items,
        });
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

  render() {
    const { playlists } = this.state;
    return (
      <div className="Sidebar">
        <Playlists playlists={playlists} />
      </div>
    );
  }
}

export default Playlists;
