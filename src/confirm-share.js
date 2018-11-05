import React from 'react'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

export default class ConfirmShare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmationMessage: null
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.storeShare()
    this.setState({ confirmationMessage: true })
  }

  render() {
    return (
      <Modal open={true} onClose={this.props.hideConfirmShare}>
        <div className='centered confirm-share'>
          <p>Are you sure you want to share <b>{this.props.selectedPlaylistName}</b> with <b>{this.props.recipientUserName}</b>?</p>
          <br />
          <Button onClick={this.onClick} size="large" color="primary" variant="contained">Confirm</Button>
          {this.state.confirmationMessage && <p className='share-confirmation'>Playlist shared!</p>}
        </div>
      </Modal>
    )
  }
}
