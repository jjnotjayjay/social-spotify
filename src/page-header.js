import React from 'react'
import UserAvatar from './avatar.js'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Share from '@material-ui/icons/Share'
import { withStyles } from '@material-ui/core/styles'

const BackButton = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '2vh',
    float: 'left'
  }
})(ArrowBack)

const ShareButton = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '2vh',
    float: 'right'
  }
})(Share)

export default function PageHeader(props) {
  return (
    <div style={{ overflow: 'hidden' }}>
      {props.view === 'songs' && <BackButton onClick={props.returnToPlaylists} />}
      <UserAvatar userImage={props.userImage} />
      {props.view === 'songs' && <ShareButton />}
    </div>
  )
}
