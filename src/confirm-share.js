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
    const { hideConfirmShare, selectedPlaylistName, recipientUserName } = this.props
    const { confirmationMessage } = this.state
    const { onClick } = this

    return (
      <Modal open={true} onClose={hideConfirmShare}>
        <div className='centered confirm-share'>
          <p>Are you sure you want to share <b>{selectedPlaylistName}</b> with <b>{recipientUserName}</b>?</p>
          <br />
          <Button onClick={onClick} size="large" color="primary" variant="contained">Confirm</Button>
          {confirmationMessage && <p className='share-confirmation'>Playlist shared!</p>}
        </div>
      </Modal>
    )
  }
}
