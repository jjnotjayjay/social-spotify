import React from 'react'
import requestPromise from 'request-promise'

export default class Playlists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
  }

  componentDidMount() {
    const playlistDataRequest = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: { 'Authorization': 'Bearer ' + this.props.accessToken },
      json: true
    }

    requestPromise.get(playlistDataRequest)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <p>Playlist</p>
    )
  }
}
