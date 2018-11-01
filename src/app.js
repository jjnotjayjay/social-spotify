import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'
import PageHeader from './page-header.js'
import Playlists from './playlists.js'
import Songs from './songs.js'
import hashParser from './hash-parser.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: hashParser(window.location.hash)[0] || 'login',
      accessToken: hashParser(window.location.hash)[1].accessToken || '',
      userImage: hashParser(window.location.hash)[1].image || '',
      userId: hashParser(window.location.hash)[1].id || '',
      selectedPlaylist: null
    }
    this.updateSelectedPlaylist = this.updateSelectedPlaylist.bind(this)
    this.returnToPlaylists = this.returnToPlaylists.bind(this)
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        view: hashParser(window.location.hash)[0]
      })
    })
  }

  updateSelectedPlaylist(playlistId) {
    this.setState({
      selectedPlaylist: playlistId,
      view: 'songs'
    })
  }

  returnToPlaylists() {
    this.setState({
      selectedPlaylist: null,
      view: 'playlist'
    })
  }

  renderView(view) {
    switch (view) {
      case 'login':
        return <Login />
      case 'playlist':
        return (
          <div>
            <PageHeader userImage={this.state.userImage} />
            <Playlists accessToken={this.state.accessToken} updateSelected={this.updateSelectedPlaylist} />
          </div>
        )
      case 'songs':
        return (
          <div>
            <PageHeader view={this.state.view} userImage={this.state.userImage} returnToPlaylists={this.returnToPlaylists} />
            <Songs accessToken={this.state.accessToken} userId={this.state.userId} selectedPlaylist={this.state.selectedPlaylist} />
          </div>
        )
    }
  }

  render() {
    return this.renderView(this.state.view)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
