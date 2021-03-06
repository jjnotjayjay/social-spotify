import React from 'react'
import OpaqueList from './opaque-list.js'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import UserAvatar from './avatar.js'
import ListItemText from '@material-ui/core/ListItemText'
import ConfirmShare from './confirm-share.js'
import { withStyles } from '@material-ui/core/styles'

const UserListText = withStyles({
  primary: {
    fontSize: '0.85rem',
    lineHeight: '44px'
  }
})(ListItemText)

export default class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      confirmShareDisplayed: false,
      recipientUserName: null,
      recipientUserId: null
    }
    this.displayConfirmShare = this.displayConfirmShare.bind(this)
    this.hideConfirmShare = this.hideConfirmShare.bind(this)
    this.storeShare = this.storeShare.bind(this)
  }

  componentDidMount() {
    const { userId } = this.props

    fetch('/users/' + userId)
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res })
      })
  }

  displayConfirmShare(userName, userId) {
    this.setState({
      confirmShareDisplayed: true,
      recipientUserName: userName,
      recipientUserId: userId
    })
  }

  hideConfirmShare() {
    this.setState({
      confirmShareDisplayed: false,
      recipientUserName: null,
      recipientUserId: null
    })
  }

  storeShare() {
    const { userId: sendingUserId, userDisplayName: sendingUserName, selectedPlaylistId: playlistId, selectedPlaylistName: playlistName } = this.props
    const { recipientUserId } = this.state
    fetch('/shares', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sendingUserId, sendingUserName, recipientUserId, playlistId, playlistName })
    })
    window.setTimeout(() => this.props.updateView('playlist'), 1500)
  }

  render() {
    const { users, confirmShareDisplayed, recipientUserName } = this.state
    const { selectedPlaylistName } = this.props
    const { displayConfirmShare, hideConfirmShare, storeShare } = this
    return (
      <OpaqueList>
        {users.map(user => {
          return (
            <ListItem key={user.id} onClick={() => displayConfirmShare(user.displayName, user.id)}>
              <ListItemAvatar>
                <UserAvatar userImage={user.image} />
              </ListItemAvatar>
              <UserListText primary={user.displayName} />
            </ListItem>
          )
        })}
        {confirmShareDisplayed &&
          <ConfirmShare hideConfirmShare={hideConfirmShare} selectedPlaylistName={selectedPlaylistName} recipientUserName={recipientUserName} storeShare={storeShare} />}
      </OpaqueList>
    )
  }
}
