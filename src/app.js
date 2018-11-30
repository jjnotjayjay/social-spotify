import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'
import NavBar from './nav-bar.js'
import Playlists from './playlists.js'
import Songs from './songs.js'
import UserList from './user-list.js'
import Shares from './shares.js'
import hashParser from './hash-parser.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: hashParser(window.location.hash)[0] || 'login',
      accessToken: hashParser(window.location.hash)[1].accessToken || '',
      user: {
        image: hashParser(window.location.hash)[1].image || '',
        id: hashParser(window.location.hash)[1].id || '',
        displayName: hashParser(window.location.hash)[1].displayName || ''
      },
      selectedPlaylist: {
        id: null,
        name: null
      },
      unseenPlaylists: null
    }
    this.fetchUnseenPlaylists = this.fetchUnseenPlaylists.bind(this)
    this.updateSelectedPlaylist = this.updateSelectedPlaylist.bind(this)
    this.returnToPlaylists = this.returnToPlaylists.bind(this)
    this.updateView = this.updateView.bind(this)
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ view: hashParser(window.location.hash)[0] })
    })

    if (this.state.view !== 'login') {
      this.fetchUnseenPlaylists()
    }
  }

  fetchUnseenPlaylists() {
    fetch('/shares/' + this.state.user.id + '/count')
      .then(res => res.json())
      .then(res => this.setState({ unseenPlaylists: res }))
  }

  updateSelectedPlaylist(playlistId, playlistName) {
    this.setState({
      selectedPlaylist: {
        id: playlistId,
        name: playlistName
      },
      view: 'songs'
    })
  }

  returnToPlaylists() {
    this.setState({
      selectedPlaylist: {
        id: null,
        name: null
      },
      view: 'playlist'
    })
  }

  updateView(view) {
    this.setState({ view })
  }

  renderView(newView) {
    const { view, user, unseenPlaylists, accessToken, selectedPlaylist } = this.state
    const { fetchUnseenPlaylists, updateSelectedPlaylist, returnToPlaylists, updateView } = this

    switch (newView) {
      case 'login':
        return <Login />
      case 'playlist':
        return (
          <div>
            <NavBar userImage={user.image} unseenPlaylists={unseenPlaylists} updateView={updateView} />
            <Playlists accessToken={accessToken} updateSelected={updateSelectedPlaylist} />
          </div>
        )
      case 'songs':
        return (
          <div>
            <NavBar view={view} userImage={user.image} returnToPlaylists={returnToPlaylists} updateView={updateView} unseenPlaylists={unseenPlaylists} />
            <Songs accessToken={accessToken} userId={user.id} selectedPlaylistId={selectedPlaylist.id} selectedPlaylistName={selectedPlaylist.name} />
          </div>
        )
      case 'users':
        return (
          <div>
            <NavBar view={view} userImage={user.image} updateView={updateView} unseenPlaylists={unseenPlaylists} />
            <UserList userId={user.id} userDisplayName={user.displayName} selectedPlaylistId={selectedPlaylist.id} selectedPlaylistName={selectedPlaylist.name} updateView={updateView} />
          </div>
        )
      case 'shares':
        return (
          <div>
            <NavBar view={view} userImage={user.image} returnToPlaylists={returnToPlaylists} updateView={updateView} unseenPlaylists={unseenPlaylists} />
            <Shares accessToken={accessToken} userId={user.id} fetchUnseenPlaylists={fetchUnseenPlaylists} updateView={updateView} />
          </div>
        )
    }
  }

  render() {
    return this.renderView(this.state.view)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
