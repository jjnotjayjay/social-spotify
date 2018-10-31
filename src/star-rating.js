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
      rating: props.currentRating || 2
    }
  }

  renderStars(rating) {
    const stars = []
    for (var i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<GoldenStar />)
      }
      else {
        stars.push(<TinyButton />)
      }
    }
    return stars
  }

  render() {
    return (
      <div>
        {this.renderStars(this.state.rating)}
      </div>
    )
  }
}
