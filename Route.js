import React, {Component} from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'
import Home from './screens/Home'
import VideoPlayer from './screens/Video'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="home" component={Home} title="Playlist" />
          <Scene key="watchvideo" component={VideoPlayer} />
        </Stack>
      </Router>
    )
  }
}
