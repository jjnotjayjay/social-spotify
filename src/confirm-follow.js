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
    const { hideConfirmFollow, playlistName, sendingUserName } = this.props
    const { confirmationMessage } = this.state
    const { onClick } = this
    return (
      <Modal open={true} onClose={hideConfirmFollow}>
        <div className='centered confirmation-modal'>
          <p>Are you sure you want to follow <b>{playlistName}</b> from <b>{sendingUserName}</b>?</p>
          <br />
          <Button onClick={onClick} size="large" color="primary" variant="contained">Confirm</Button>
          {confirmationMessage && <p className='share-confirmation'>Playlist followed!</p>}
        </div>
      </Modal>
    )
  }
}
