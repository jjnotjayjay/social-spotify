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
    const { userId: sendingUserId, selectedPlaylistId: playlistId } = this.props
    const { recipientUserId } = this.state
    fetch('/shares', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sendingUserId, recipientUserId, playlistId })
    })
    window.setTimeout(() => this.props.updateView('playlist'), 1500)
  }

  render() {
    return (
      <OpaqueList>
        {this.state.confirmShareDisplayed &&
          <ConfirmShare hideConfirmShare={this.hideConfirmShare} selectedPlaylistName={this.props.selectedPlaylistName} recipientUserName={this.state.recipientUserName} storeShare={this.storeShare} />}
        {this.state.users.map(user => {
          return (
            <ListItem key={user.id} onClick={() => this.displayConfirmShare(user.displayName, user.id)}>
              <ListItemAvatar>
                <UserAvatar userImage={user.image} />
              </ListItemAvatar>
              <UserListText primary={user.displayName} />
            </ListItem>
          )
        })}
      </OpaqueList>
    )
  }
}
