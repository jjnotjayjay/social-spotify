import React from 'react'
import requestPromise from 'request-promise'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import { SPOTIFY_API } from './constants.js'

const OpaqueList = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '600px',
    margin: 'auto'
  }
})(List)

const NarrowListItem = withStyles({
  root: {
    width: '80%'
  }
})(ListItem)

const SongText = withStyles({
  primary: {
    lineHeight: '1rem',
    fontSize: '0.8rem'
  },
  secondary: {
    fontSize: '0.7rem'
  }
})(ListItemText)

export default class Songs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: []
    }
  }

  componentDidMount() {
    const songDataRequest = {
      url: SPOTIFY_API +
        'playlists/' +
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
    const { songs } = this.state
    return (
      <OpaqueList>
        {songs.map(song => {
          return (
            <NarrowListItem key={song.track.id}>
              <ListItemAvatar>
                <Avatar src={song.track.album.images[0].url} />
              </ListItemAvatar>
              <SongText primary={song.track.name} secondary={song.track.artists[0].name} />
            </NarrowListItem>
          )
        })}
      </OpaqueList>
    )
  }
}
