import React from 'react'

export default class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.userId })
    })
      .then(res => res.json())
      .then(results => console.log(results))
  }

  render() {
    return (
      <p>Users</p>
    )
  }
}
