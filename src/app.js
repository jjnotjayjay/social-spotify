import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'
import PageHeader from './page-header.js'
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

  renderView(newView) {
    const { view, userImage, userId, unseenPlaylists, accessToken, selectedPlaylistName, selectedPlaylistId } = this.state
    const { updateSelectedPlaylist, returnToPlaylists, updateView } = this

    switch (newView) {
      case 'login':
        return <Login />
      case 'playlist':
        return (
          <div>
            <PageHeader userImage={userImage} unseenPlaylists={unseenPlaylists} updateView={updateView} />
            <Playlists accessToken={accessToken} updateSelected={updateSelectedPlaylist} />
          </div>
        )
      case 'songs':
        return (
          <div>
            <PageHeader view={view} userImage={userImage} returnToPlaylists={returnToPlaylists} updateView={updateView} unseenPlaylists={unseenPlaylists} />
            <Songs accessToken={accessToken} userId={userId} selectedPlaylistId={selectedPlaylistId} />
          </div>
        )
      case 'users':
        return (
          <div>
            <PageHeader view={view} userImage={userImage} updateView={updateView} unseenPlaylists={unseenPlaylists} />
            <UserList userId={userId} selectedPlaylistName={selectedPlaylistName} selectedPlaylistId={selectedPlaylistId} updateView={updateView} />
          </div>
        )
      case 'shares':
        return (
          <div>
            <PageHeader view={view} userImage={userImage} updateView={updateView} unseenPlaylists={unseenPlaylists} />
            <Shares />
          </div>
        )
    }
  }

  render() {
    return this.renderView(this.state.view)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
