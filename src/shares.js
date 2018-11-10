import React from 'react'
import OpaqueList from './opaque-list.js'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ConfirmFollow from './confirm-follow.js'
import { withStyles } from '@material-ui/core/styles'

const BoldListItemText = withStyles({
  primary: {
    fontWeight: 'bold'
  },
  secondary: {
    fontWeight: 'bold'
  }
})(ListItemText)

export default class Shares extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shares: [],
      confirmFollowDisplayed: false,
      playlistId: null,
      playlistName: null,
      sendingUserId: null,
      sendingUserName: null
    }
    this.displayConfirmFollow = this.displayConfirmFollow.bind(this)
    this.hideConfirmFollow = this.hideConfirmFollow.bind(this)
    this.followPlaylist = this.followPlaylist.bind(this)
  }

  componentDidMount() {
    fetch('/shares/' + this.props.userId)
      .then(res => res.json())
      .then(res => this.setState({ shares: res }))
  }

  displayConfirmFollow(share) {
    this.setState({
      confirmFollowDisplayed: true,
      playlistId: share.playlistId,
      playlistName: share.playlistName,
      sendingUserName: share.sendingUserName,
      sendingUserId: share.sendingUserId
    })
  }

  hideConfirmFollow() {
    this.setState({
      confirmFollowDisplayed: false,
      playlistName: null,
      sendingUserName: null
    })
  }

  followPlaylist() {
    const { accessToken, userId, fetchUnseenPlaylists, updateView } = this.props
    const { playlistId, sendingUserId } = this.state
    fetch('/shares/seen/' + userId + '/' + playlistId + '/' + sendingUserId)
    fetch('/shares/follow/' + accessToken + '/' + playlistId, {
      method: 'PUT'
    })
    fetchUnseenPlaylists()
    window.setTimeout(() => updateView('playlist'), 1500)
  }

  render() {
    const { shares, confirmFollowDisplayed, playlistName, sendingUserName } = this.state
    const { displayConfirmFollow, hideConfirmFollow, followPlaylist } = this
    return (
      <OpaqueList>
        {shares.length > 0 && shares.map(share => {
          const date = new Date(share.currentTime).toString().split(' ')
          const formattedDate = date[0] + ', ' + date[1] + ' ' + date[2]
          return (
            <ListItem key={share.playlistId} onClick={() => displayConfirmFollow(share)}>
              {!share.seen
                ? <BoldListItemText primary={share.playlistName} secondary={'from ' + share.sendingUserName} />
                : <ListItemText primary={share.playlistName} secondary={'from ' + share.sendingUserName} />}
              <span className={!share.seen ? 'share-date bold' : 'share-date'}>shared {formattedDate}</span>
            </ListItem>
          )
        })}
        {confirmFollowDisplayed &&
          <ConfirmFollow playlistName={playlistName} sendingUserName={sendingUserName} hideConfirmFollow={hideConfirmFollow} followPlaylist={followPlaylist} />}
        {shares.length === 0 &&
          <ListItem>
            <ListItemText primary="No playlists have been shared with you." />
          </ListItem>}
      </OpaqueList>
    )
  }
}
