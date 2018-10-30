import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'
import Avatar from './avatar.js'
import Playlists from './playlists.js'
import Songs from './songs.js'
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
    this.updateSelectedPlaylist = this.updateSelectedPlaylist.bind(this)
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        view: hashParser(window.location.hash)[0]
      })
    })
  }

  updateSelectedPlaylist(playlistURI) {
    this.setState({
      selectedPlaylist: playlistURI,
      view: 'songs'
    })
  }

  renderView(view) {
    switch (view) {
      case 'login':
        return <Login />
      case 'playlist':
        return (
          <div>
            <div className="new-block-formatting-context">
              <Avatar userImage={this.state.image} />
            </div>
            <Playlists accessToken={this.state.accessToken} updateSelected={this.updateSelectedPlaylist}/>
          </div>
        )
      case 'songs':
        return (
          <div>
            <div className="new-block-formatting-context">
              <Avatar userImage={this.state.image} />
            </div>
            <Songs accessToken={this.state.accessToken} selectedPlaylist={this.state.selectedPlaylist}/>
          </div>
        )
    }
  }

  render() {
    return this.renderView(this.state.view)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
