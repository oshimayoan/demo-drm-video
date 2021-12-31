import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import VideoJS from './VideoJS'
import ShakaPlayer from './ShakaPlayer';
// import Unity, { UnityContent } from "react-unity-webgl";

// const unityContext = new UnityContext({
//   loaderUrl: "unityweb/myunityapp.loader.js",
//   dataUrl: "unityweb/myunityapp.data",
//   frameworkUrl: "unityweb/myunityapp.framework.js",
//   codeUrl: "unityweb/myunityapp.wasm",
// });

// const unityContent = new UnityContent(
//   "unity/testWEbgl.json",
//   "unity/UnityLoader.js"
// );

export default function App() {
  let playerRef = React.useRef(null);

  let [isIVQVisible, setIVQVisible] = useState(false);
  let [isIVQ2Visible, setIVQ2Visible] = useState(false);
  let [isUnity2Visible, setUnity2Visible] = useState(false);

  let videoJsOptions = { // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    // sources: [{
    //   src: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //   type: 'video/mp4'
    // }]
  }

  let handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      console.log('videojs player is waiting');
    });

    player.on('dispose', () => {
      console.log('videojs player will dispose');
    });
  };

  return (
    <View style={styles.container}>
      {/* <View style={{ paddingVertical: 24, width: '100%' }}>
        <VideoJS 
          isIVQVisible={isIVQVisible} 
          options={videoJsOptions} 
          onReady={handlePlayerReady} 
        />
        <Button 
          title="Toggle IVQ" 
          onPress={() => setIVQVisible(s => !s)}
        />
      </View> */}
      <View style={{ paddingVertical: 24 }}>
        <ShakaPlayer isIVQVisible={isIVQ2Visible} isUnityVisible={isUnity2Visible} />
        <Button 
          title="Toggle IVQ" 
          onPress={() => setIVQ2Visible(s => !s)}
        />
        <Button
          title="Toggle Unity"
          onPress={() => setUnity2Visible(s => !s)}
        />
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      {/* <Unity unityContent={unityContent} /> */}
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
