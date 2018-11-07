import React from 'react'
import UserAvatar from './avatar.js'
import Badge from '@material-ui/core/Badge'
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

const PlaylistCountBadge = withStyles({
  root: {
    display: 'inherit',
    position: 'inherit'
  },
  badge: {
    top: '6px',
    right: '6px',
    width: '18px',
    height: '18px'
  }
})(Badge)

export default function PageHeader(props) {
  return (
    <div style={{ overflow: 'hidden' }}>
      {props.view === 'songs' && <BackButton onClick={props.returnToPlaylists} />}
      {props.view === 'users' && <BackButton onClick={() => props.updateView('songs')} />}
      {props.unseenPlaylists > 0
        ? (<PlaylistCountBadge color='secondary' badgeContent={props.unseenPlaylists}>
          <UserAvatar classes='float-right-margin' userImage={props.userImage} onClick={() => props.updateView('shares')} />
        </PlaylistCountBadge>)
        : <UserAvatar classes='float-right-margin' userImage={props.userImage} onClick={() => props.updateView('shares')} />}
      {props.view === 'songs' && <ShareButton onClick={() => props.updateView('users')} viewBox={'-3 -4 32 32'}/>}
    </div>
  )
}
