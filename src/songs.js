import React from 'react'
import requestPromise from 'request-promise'

export default class Songs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: []
    }
  }

  componentDidMount() {
    const songDataRequest = {
      url: 'https://api.spotify.com/v1/playlists/' +
        this.props.selectedPlaylist +
        '/tracks',
      headers: { Authorization: 'Bearer ' + this.props.accessToken },
      json: true
    }

    requestPromise(songDataRequest)
      .then(res =>
        this.setState({
          songs: res.items
        })
      )
  }

  render() {
    return (
      <p>Songs</p>
    )
  }
}
