import React from 'react'
import OpaqueList from './opaque-list.js'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import StarRating from './star-rating.js'
import MusicNote from '@material-ui/icons/MusicNote'
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

const RoundNote = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: '40px',
    height: '40px',
    borderRadius: '50%'
  }
})(MusicNote)

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
      playlistId: this.props.selectedPlaylistId,
      songDataRequest: {
        url: SPOTIFY_API +
          'playlists/' +
          this.props.selectedPlaylistId +
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
        this.setState({ songs: res.items })
      })
  }

  storeRating(rating, songId) {
    const { userId, selectedPlaylistId: playlistId } = this.props
    fetch('/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, playlistId, songId, rating })
    })
  }

  render() {
    const { songs } = this.state
    const { storeRating } = this
    return (
      <OpaqueList>
        {songs && songs.map(song => {
          return (
            <div key={song.track.id}>
              <ListItem>
                <ListItemAvatar>
                  {song.track.album
                    ? <Avatar src={song.track.album.images[0].url} />
                    : <RoundNote />}
                </ListItemAvatar>
                {song.track.artists
                  ? <SongText primary={song.track.name} secondary={song.track.artists[0].name} />
                  : <SongText primary={song.track.name} />}
                <StarRating storeRating={storeRating} songId={song.track.id} currentRating={song.track.rating} />
              </ListItem>
            </div>
          )
        })}
      </OpaqueList>
    )
  }
}
