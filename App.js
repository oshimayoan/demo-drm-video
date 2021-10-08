import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VideoJS from './VideoJS'

export default function App() {
  let playerRef = React.useRef(null);

  let videoJsOptions = { // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      type: 'video/mp4'
    }]
  }

  let handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <View style={styles.container}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
