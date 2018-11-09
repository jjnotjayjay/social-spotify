import React from 'react'
import requestPromise from 'request-promise'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { SPOTIFY_API } from './constants.js'

const OpaqueListItem = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '86%',
    maxWidth: '600px',
    margin: 'auto'
  }
})(ListItem)

export default class Playlists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
  }

  componentDidMount() {
    const playlistDataRequest = {
      url: SPOTIFY_API + 'me/playlists',
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
      <List style={{ paddingTop: '0' }}>
        {playlists.length > 0 && playlists.map(playlist => {
          return (
            <div key={playlist.id}>
              <OpaqueListItem onClick={() => this.props.updateSelected(playlist.id, playlist.name)}>
                <ListItemText primary={playlist.name} secondary={'by ' + playlist.owner.display_name}/>
              </OpaqueListItem>
              <Divider style={{ visibility: 'hidden' }}/>
            </div>
          )
        })}
        {playlists.length === 0 && (
          <OpaqueListItem>
            <ListItemText primary='User has no playlists.' className='align-center' />
          </OpaqueListItem>
        )}
      </List>
    )
  }
}
