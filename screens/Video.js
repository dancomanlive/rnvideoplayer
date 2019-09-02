
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, ActivityIndicator, SafeAreaView } from 'react-native'
import Video from 'react-native-video'
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls'
 
export default class VideoPlayer extends Component {

  state = {
    currentTime: 0,
    duration: 0,
    isFullScreen: false,
    isLoading: true,
    paused: false,
    playerState: PLAYER_STATES.PLAYING,
    screenType: 'content',
    videoList: [],
    index: 0,
    loading: true
  }

  componentDidMount = () => {
    this.props.navigation.setParams({
      title: this.props.videoList[this.props.index].title,
    });
    this.setState({
      videoList: this.props.videoList,
      index: this.props.index,
      loading: false,
    });
  }

  onSeek = seek => {
    this.videoPlayer.seek(seek)
  }

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    })
  }

  onReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING})
    this.videoPlayer.seek(0)
  }

  onNext = () => {
    this.setState({
      playerState: PLAYER_STATES.PLAYING,
      index: this.state.index + 1,
    })
    this.videoPlayer.seek(0)
  }

  onProgress = data => {
    const {isLoading, playerState} = this.state
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime})
    }
  }

  onLoad = data => this.setState({duration: data.duration, isLoading: false})

  onLoadStart = data => this.setState({isLoading: true})

  onEnd = () => {
    if (this.state.videoList.length - 1 === this.state.index) {
      this.setState({playerState: PLAYER_STATES.ENDED})
      return
    }
    this.onNext()
  }

  videoError = error => console.log('videoError', error)

  exitFullScreen = () => {
    alert('Exit full screen')
  }

  enterFullScreen = () => {}

  onFullScreen = () => {
    if (this.state.screenType == 'content') {
      this.setState({screenType: 'cover'})
    } else {
      this.setState({screenType: 'content'});
    }
  }

  onSeeking = currentTime => this.setState({currentTime})
 
  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="gray" />
        </SafeAreaView>
      )
    }
    return (
      <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          onError={this.videoError} 
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{uri: this.state.videoList[this.state.index].source}}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
})