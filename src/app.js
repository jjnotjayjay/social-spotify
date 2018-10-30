import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'
import Playlists from './playlists.js'
import Avatar from './avatar.js'
import hashParser from './hash-parser.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: hashParser(window.location.hash)[0] || 'login',
      accessToken: hashParser(window.location.hash)[1].accessToken || '',
      image: hashParser(window.location.hash)[1].image || '',
      selectedPlaylist: null
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        view: hashParser(window.location.hash)[0]
      })
    })
  }

  renderView(view) {
    switch (view) {
      case 'login':
        return <Login />
      case 'playlist':
        return (
          <div>
            <div className="hide-overflow">
              <Avatar userImage={this.state.image} />
            </div>
            <Playlists accessToken={this.state.accessToken} />
          </div>
        )
    }
  }

  render() {
    return this.renderView(this.state.view)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
