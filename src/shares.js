import React from 'react'

export default class Shares extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shares: null
    }
  }

  componentDidMount() {
    fetch('/shares/' + this.props.userId)
      .then(res => res.json())
      .then(res => this.setState({ shares: res }))
  }

  render() {
    return (
      <div>Shares</div>
    )
  }
}
