import React from 'react'
import OpaqueList from './opaque-list.js'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import UserAvatar from './avatar.js'
import ListItemText from '@material-ui/core/ListItemText'
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
      users: []
    }
  }

  componentDidMount() {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.userId })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res })
      })
  }

  render() {
    return (
      <OpaqueList>
        {this.state.users.map(user => {
          return (
            <ListItem key={user.id}>
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
