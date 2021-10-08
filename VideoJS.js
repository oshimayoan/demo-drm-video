import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import videojs from "video.js";

import 'videojs-contrib-eme';

import "video.js/dist/video-js.css";

export default function VideoJS(props) {
  let [status, setStatus] = useState({ isPlaying: false });

  let videoRef = React.useRef(null);
  let playerRef = React.useRef(null);
  let { isIVQVisible, options, onReady } = props;

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      let player = playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      });
      player.eme();
      player.src({
        src: 'https://rubel-video-cdn.ruangguru.com/RGVV-OMKP3UR83RJ/ca037c3e-1aa1-4e8a-9512-6bbae733955b/ca037c3e-1aa1-4e8a-9512-6bbae733955b.mpd',
        type: 'application/dash+xml',
        keySystems: {
          'com.widevine.alpha': 'https://wv.service.expressplay.com/hms/wv/rights/?ExpressPlayToken=BQAO5vNIKfYAJDM0NTJhZjc1LWI5ZTUtNDkzMy04NDE0LTc5ZTk1NzA5ZmMxMgAAAGCxNQWPRCrXUvYGeJmBbutI4Md-6YrbOy0CpEY7gggdi8TR6NQCCgjuudxdUuropfoFoVshsicpvsuuxfEBnHCrnIVTAvcUk6jKvrX1ujy4Wkji9j3pMl6hWDHVNrOAaCfRPdtik3D7c_c6kg0pc7N1zV1Wlg'
        }
      })
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
      {/* NOTE: IVQ overlay example */}
      {isIVQVisible && <View style={styles.ivq}>
        <Text>Howdy world!</Text>
      </View>}
    </div>
  );
}

const styles = StyleSheet.create({
  ivq: {
    backgroundColor: 'skyblue', 
    zIndex: 10, 
    position: 'absolute', 
    bottom: 30, 
    top: 0, 
    left: 0, 
    right: 0,
  }
})
