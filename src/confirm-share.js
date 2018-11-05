import React from 'react'
import Modal from '@material-ui/core/Modal'

export default function ConfirmShare(props) {
  return (
    <Modal open={true} onClose={props.hideConfirmShare}>
      <div className='centered confirm-share'>
        <p>{props.recipientOfShare} {props.selectedPlaylistName}</p>
      </div>
    </Modal>
  )
}
