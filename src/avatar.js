import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const MarginAvatar = withStyles({
  root: {
    margin: '2vh',
    float: 'right'
  }
})(Avatar)

export default function UserAvatar(props) {
  return (
    <MarginAvatar src={props.userImage} />
  )
}
