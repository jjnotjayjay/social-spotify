import React from 'react'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

export default class ConfirmFollow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmationMessage: null
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.followPlaylist()
    this.setState({ confirmationMessage: true })
  }

  render() {
    return (
      <Modal open={true} onClose={this.props.hideConfirmFollow}>
        <div className='centered confirm-share'>
          <p>Are you sure you want to follow <b>{this.props.playlistName}</b> from <b>{this.props.sendingUserName}</b>?</p>
          <br />
          <Button onClick={this.onClick} size="large" color="primary" variant="contained">Confirm</Button>
          {this.state.confirmationMessage && <p className='share-confirmation'>Playlist followed!</p>}
        </div>
      </Modal>
    )
  }
}
