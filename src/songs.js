import React from 'react'
import OpaqueList from './opaque-list.js'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import StarRating from './star-rating.js'
import { withStyles } from '@material-ui/core/styles'
import { SPOTIFY_API } from './constants.js'

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
    this.storeRating = this.storeRating.bind(this)
  }

  componentDidMount() {
    const req = {
      playlistId: this.props.selectedPlaylist,
      songDataRequest: {
        url: SPOTIFY_API +
          'playlists/' +
          this.props.selectedPlaylist +
          '/tracks',
        headers: { Authorization: 'Bearer ' + this.props.accessToken },
        json: true
      }
    }

    fetch('/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          songs: res.items
        })
      })
  }

  storeRating(rating, songId) {
    const { userId, selectedPlaylist: playlistId } = this.props
    fetch('/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, playlistId, songId, rating })
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
                <StarRating storeRating={this.storeRating} songId={song.track.id} currentRating={song.track.rating} />
              </ListItem>
            </div>
          )
        })}
      </OpaqueList>
    )
  }
}
