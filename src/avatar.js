import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'

const MarginAvatar = withStyles({
  root: {
    margin: '2vh',
    float: 'right'
  }
})(Avatar)

const DefaultImage = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '2vh',
    float: 'right'
  }
})(AccountCircle)

export default function UserAvatar(props) {
  return props.userImage ? <MarginAvatar src={props.userImage} /> : <DefaultImage />
}
