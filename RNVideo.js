import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Video from 'react-native-video';

export default function Player(props) {
  let playerRef = useRef(null);

  let [isPlaying, setPlaying] = useState(false);

  let onPlayerPress = () => setPlaying(s => !s);
  
  let onBuffer = () => console.log('video is buffering');

  let onError = (e) => console.error('video is catching', e);
  
  return (
    <TouchableWithoutFeedback onPress={onPlayerPress}>
      <Video
        ref={playerRef}
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        paused={!isPlaying}
        resizeMode="contain"
        onBuffer={onBuffer}
        onError={onError}
        style={styles.player}
      />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  player: {
    width: '100%',
    maxWidth: '100%',
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  }
});
