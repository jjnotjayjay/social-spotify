import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'login'
    }
  }

  renderView(view) {
    switch (view) {
      case 'login':
        return <Login />
    }
  }

  render() {
    return this.renderView(this.state.view)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
