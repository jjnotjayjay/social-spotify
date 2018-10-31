import React from 'react'
import UserAvatar from './avatar.js'
import ArrowBack from '@material-ui/icons/ArrowBack'

export default function PageHeader(props) {
  return (
    <div style={{ overflow: 'hidden' }}>
      {props.view === 'songs' && <ArrowBack />}
      <UserAvatar userImage={props.userImage} />
    </div>
  )
}
