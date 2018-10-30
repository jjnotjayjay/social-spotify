import React from 'react'
import Avatar from './avatar.js'

export default function PageHeader(props) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Avatar userImage={props.userImage} />
    </div>
  )
}
