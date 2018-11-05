import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'
import PageHeader from './page-header.js'
import Playlists from './playlists.js'
import Songs from './songs.js'
import UserList from './user-list.js'
import hashParser from './hash-parser.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: hashParser(window.location.hash)[0] || 'login',
      accessToken: hashParser(window.location.hash)[1].accessToken || '',
      userImage: hashParser(window.location.hash)[1].image || '',
      userId: hashParser(window.location.hash)[1].id || '',
      selectedPlaylistId: null,
      selectedPlaylistName: null
    }
    this.updateSelectedPlaylist = this.updateSelectedPlaylist.bind(this)
    this.returnToPlaylists = this.returnToPlaylists.bind(this)
    this.updateView = this.updateView.bind(this)
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        view: hashParser(window.location.hash)[0]
      })
    })
  }

  updateSelectedPlaylist(playlistId, playlistName) {
    this.setState({
      selectedPlaylistId: playlistId,
      selectedPlaylistName: playlistName,
      view: 'songs'
    })
  }

  returnToPlaylists() {
    this.setState({
      selectedPlaylistId: null,
      selectedPlaylistName: null,
      view: 'playlist'
    })
  }

  updateView(view) {
    this.setState({
      view: view
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
            <PageHeader view={this.state.view} userImage={this.state.userImage} returnToPlaylists={this.returnToPlaylists} updateView={this.updateView} />
            <Songs accessToken={this.state.accessToken} userId={this.state.userId} selectedPlaylistId={this.state.selectedPlaylistId} />
          </div>
        )
      case 'users':
        return (
          <div>
            <PageHeader view={this.state.view} userImage={this.state.userImage} updateView={this.updateView} />
            <UserList userId={this.state.userId} selectedPlaylistName={this.state.selectedPlaylistName} selectedPlaylistId={this.state.selectedPlaylistId} updateView={this.updateView} />
          </div>
        )
    }
  }

  render() {
    return this.renderView(this.state.view)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
