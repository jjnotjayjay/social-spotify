import React from 'react'
import UserAvatar from './avatar.js'
import Badge from '@material-ui/core/Badge'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Share from '@material-ui/icons/Share'
import { withStyles } from '@material-ui/core/styles'

const BackButton = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '2vh',
    float: 'left'
  }
})(ArrowBack)

const ShareButton = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '2vh 0 2vh 2vh',
    float: 'right'
  }
})(Share)

const PlaylistCountBadge = withStyles({
  root: {
    display: 'inherit'
  },
  badge: {
    top: '6px',
    right: '6px',
    width: '18px',
    height: '18px'
  }
})(Badge)

export default function NavBar(props) {
  const { view, returnToPlaylists, updateView, unseenPlaylists, userImage } = props
  return (
    <div className='nav-bar'>
      {(view === 'songs' || view === 'shares') && <BackButton onClick={returnToPlaylists} />}
      {view === 'users' && <BackButton onClick={() => updateView('songs')} />}
      <img id="nav-bar-logo" src="assets/logo-mini.png"/>
      {unseenPlaylists > 0
        ? (<PlaylistCountBadge color='secondary' badgeContent={unseenPlaylists} onClick={() => updateView('shares')}>
          <UserAvatar classes='float-right-margin' userImage={userImage} />
        </PlaylistCountBadge>)
        : (<div onClick={() => updateView('shares')}>
          <UserAvatar classes='float-right-margin' userImage={userImage} />
        </div>
        )}
      {view === 'songs' && <ShareButton onClick={() => updateView('users')} viewBox={'-3 -4 32 32'}/>}
    </div>
  )
}
