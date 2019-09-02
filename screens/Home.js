import React, {Component} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import data from './Data'

export default class Home extends Component {
  watchVideo = index => Actions.watchvideo({index, videoList: data.videos})

  render() {
    const {videos} = data;
    return (
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={videos}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.watchVideo(index)}>
              <Text style={styles.item}>
                {item.title} - {item.subtitle}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.thumb}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  touch: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
  },
})