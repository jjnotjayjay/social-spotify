import React from 'react'
import Avatar from '@material-ui/core/Avatar'

function UserAvatar(props) {
  return (
    <Avatar src={props.userImage} />
  )
}

module.exports = UserAvatar
