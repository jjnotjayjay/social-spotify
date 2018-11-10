import React from 'react'
import Star from '@material-ui/icons/Star'
import Button from '@material-ui/icons/FiberManualRecord'
import { withStyles } from '@material-ui/core/styles'

const GoldenStar = withStyles({
  root: {
    color: 'rgb(225, 176, 60)'
  }
})(Star)

const TinyButton = withStyles({
  root: {
    width: '12px',
    height: '12px',
    margin: '6px'
  }
})(Button)

export default class StarRating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: props.currentRating || 0
    }
  }

  updateRating(rating, songId) {
    this.setState({ rating })
    this.props.storeRating(rating, songId)
  }

  renderStars(rating) {
    const { songId } = this.props
    const { updateRating } = this
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<GoldenStar key={songId + 'star' + i} onClick={() => updateRating(i, songId)}/>)
      }
      else {
        stars.push(<TinyButton key={songId + 'star' + i} onClick={() => updateRating(i, songId)}/>)
      }
    }
    return stars
  }

  render() {
    return (
      <span>
        {this.renderStars(this.state.rating)}
      </span>
    )
  }
}
