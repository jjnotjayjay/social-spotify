import React from 'react'
import UserAvatar from './avatar.js'
import AccountCircle from '@material-ui/icons/AccountCircle'
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
    margin: '2vh 0 2vh 2vh',
    float: 'right'
  }
})(Share)

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

export default function PageHeader(props) {
  return (
    <div style={{ overflow: 'hidden' }}>
      {props.view === 'songs' && <BackButton onClick={props.returnToPlaylists} />}
      {props.view === 'users' && <BackButton onClick={() => props.updateView('songs')} />}
      {props.userImage ? <UserAvatar userImage={props.userImage} /> : <DefaultImage />}
      {props.view === 'songs' && <ShareButton onClick={() => props.updateView('users')} viewBox={'-3 -4 32 32'}/>}
    </div>
  )
}
