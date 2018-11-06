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
      selectedPlaylistName: null,
      unseenPlaylists: null
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

    fetch('/shares/' + this.state.userId + '/count')
      .then(res => res.json())
      .then(res => this.setState({ unseenPlaylists: res }))
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
            <PageHeader userImage={this.state.userImage} unseenPlaylists={this.state.unseenPlaylists}/>
            <Playlists accessToken={this.state.accessToken} updateSelected={this.updateSelectedPlaylist} />
          </div>
        )
      case 'songs':
        return (
          <div>
            <PageHeader view={this.state.view} userImage={this.state.userImage} returnToPlaylists={this.returnToPlaylists} updateView={this.updateView} unseenPlaylists={this.state.unseenPlaylists} />
            <Songs accessToken={this.state.accessToken} userId={this.state.userId} selectedPlaylistId={this.state.selectedPlaylistId} />
          </div>
        )
      case 'users':
        return (
          <div>
            <PageHeader view={this.state.view} userImage={this.state.userImage} updateView={this.updateView} unseenPlaylists={this.state.unseenPlaylists} />
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
