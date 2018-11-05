import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'

const OpaqueList = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '600px',
    margin: 'auto'
  }
})(List)

module.exports = OpaqueList
