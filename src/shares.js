import React from 'react'
import OpaqueList from './opaque-list.js'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

const BoldListItemText = withStyles({
  primary: {
    fontWeight: 'bold'
  },
  secondary: {
    fontWeight: 'bold'
  }
})(ListItemText)

export default class Shares extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shares: []
    }
  }

  componentDidMount() {
    fetch('/shares/' + this.props.userId)
      .then(res => res.json())
      .then(res => this.setState({ shares: res }))
  }

  render() {
    const { shares } = this.state
    return (
      <OpaqueList>
        {shares.length > 0 && shares.map(share => {
          const date = new Date(share.currentTime).toString().split(' ')
          const formattedDate = date[0] + ', ' + date[1] + ' ' + date[2]
          return (
            <ListItem key={share.playlistId}>
              {!share.seen
                ? <BoldListItemText primary={share.playlistName} secondary={'from ' + share.sendingUserName} />
                : <ListItemText primary={share.playlistName} secondary={'from ' + share.sendingUserName} />}
              <span className={!share.seen ? 'share-date bold' : 'share-date'}>shared {formattedDate}</span>
            </ListItem>
          )
        })}
        {shares.length === 0 &&
          <ListItem>
            <ListItemText primary="No playlists have been shared with you." />
          </ListItem>}
      </OpaqueList>
    )
  }
}
