import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'

const DefaultImage = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: '40px',
    height: '40px',
    borderRadius: '50%'
  }
})(AccountCircle)

export default function UserAvatar(props) {
  const { classes, userImage } = props
  return userImage
    ? <Avatar src={userImage} className={classes} />
    : <DefaultImage className={classes} />
}
