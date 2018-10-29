import React from 'react'
import requestPromise from 'request-promise'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

function renderPlaylist(playlist) {
  return (
    <div>
      <ListItem>
        <ListItemText primary={playlist.name} secondary={'by ' + playlist.owner.display_name}/>
      </ListItem>
      <Divider />
    </div>
  )
}

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
      .then(res => {
        this.setState({
          playlists: res.items
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { playlists } = this.state
    return (
      <div>
        <h1>Playlists</h1>
        <List>
          {playlists.map(playlist => renderPlaylist(playlist))}
        </List>
      </div>
    )
  }
}
