import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button, useWindowDimensions} from 'react-native'
import Video, { DRMType } from 'react-native-video';
import * as ScreenOrientation from 'expo-screen-orientation';
import Orientation from 'react-native-orientation-locker';

export default function Player(props) {
  let { isIVQVisible } = props;

  let playerRef = useRef(null);

  let [isPlaying, setPlaying] = useState(false);
  let [isFullscreen, setFullscreen] = useState(false);

  let onPlayerPress = () => setPlaying(s => !s);

  let onFullscreen = async () => {
    if (isFullscreen) {
      setFullscreen(false);
      Orientation.lockToPortrait();
      return;
    }

    setFullscreen(true);
    Orientation.lockToLandscape();
  }
  
  let onBuffer = () => console.log('video is buffering');

  let onError = (e) => console.error('video is catching', e);

  return (
    <>
      <TouchableOpacity activeOpacity={0.95} onPress={onPlayerPress}>
        <Video
          ref={playerRef}
          // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          // source={{ uri: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd' }}
          // source={{ uri: 'https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd' }}
          source={{ uri: 'https://rubel-video-cdn.ruangguru.com/RGVV-OMKP3UR83RJ/ca037c3e-1aa1-4e8a-9512-6bbae733955b/ca037c3e-1aa1-4e8a-9512-6bbae733955b.mpd' }}
          drm={{
            type: DRMType.WIDEVINE,
            // licenseServer: 'https://widevine-proxy.appspot.com/proxy',
            licenseServer: 'https://wv.service.expressplay.com/hms/wv/rights/?ExpressPlayToken=BQAO5vNIKdgAJDM0NTJhZjc1LWI5ZTUtNDkzMy04NDE0LTc5ZTk1NzA5ZmMxMgAAAGBrzAhfZwl6cSGmIvVk3DjSKGJaMb-viBxomFoRP-4sj4sRxwdnA07mJxm3_tf8Whl_L_BLaDq2hwvh_mkyxlh7R7G2s-QYypBOnPzmIfBK0ORpxGVpX-jRM0pj6DtiufcQp5WNx13QDrH7ksRAWeoZxAH39Q',
          }}
          paused={!isPlaying}
          resizeMode="contain"
          onBuffer={onBuffer}
          onError={onError}
          style={isFullscreen ? styles.fullscreenPlayer : styles.player}
        />
      </TouchableOpacity>
      <Button
        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        onPress={onFullscreen}
        // onPress={() => {
        //   isFullscreen
        //     ? playerRef?.current?.dismissFullscreenPlayer()
        //     : playerRef?.current?.presentFullscreenPlayer();
        //   setFullscreen(!isFullscreen);
        // }}
      />
      {isIVQVisible && <View style={styles.ivq}>
        <Text>Howdy world!</Text>
      </View>}
    </>
  )
}

const styles = StyleSheet.create({
  player: {
    width: '100%',
    maxWidth: '100%',
    height: 200,
    backgroundColor: 'black',
  },
  fullscreenPlayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  ivq: {
    backgroundColor: 'skyblue', 
    zIndex: 1000, 
    position: 'absolute', 
    bottom: 60, 
    top: 0, 
    left: 0, 
    right: 0,
  }
});
