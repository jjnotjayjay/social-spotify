import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import StarRating from './star-rating.js'
import { withStyles } from '@material-ui/core/styles'
import { SPOTIFY_API } from './constants.js'

const OpaqueList = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '600px',
    margin: 'auto'
  }
})(List)

const SongText = withStyles({
  root: {
    width: 'calc(100% - 160px)'
  },
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

    fetch('/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(songDataRequest)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          songs: res.items
        })
      })
  }

  render() {
    const { songs } = this.state
    return (
      <OpaqueList>
        {songs && songs.map(song => {
          return (
            <div key={song.track.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={song.track.album.images[0].url} />
                </ListItemAvatar>
                <SongText primary={song.track.name} secondary={song.track.artists[0].name} />
                <StarRating />
              </ListItem>
            </div>
          )
        })}
      </OpaqueList>
    )
  }
}
