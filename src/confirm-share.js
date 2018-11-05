import React from 'react'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

export default function ConfirmShare(props) {
  return (
    <Modal open={true} onClose={props.hideConfirmShare}>
      <div className='centered confirm-share'>
        <p>Are you sure you want to share <b>{props.selectedPlaylistName}</b> with <b>{props.recipientOfShare}</b>?</p>
        <Button href="#" size="large" color="primary" variant="contained">Confirm</Button>
      </div>
    </Modal>
  )
}
