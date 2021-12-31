import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import shaka from 'shaka-player/dist/shaka-player.ui';
import Unity, { UnityContent } from "react-unity-webgl";

import 'shaka-player/dist/controls.css';

// const unityContent = new UnityContent(
//   "unityPassingTest/passingValueTest.json",
//   "unityPassingTest/UnityLoader.js"
// );

const unityContent = new UnityContent(
  'unityStream/unityplayer-webgl.json',
  'unityStream/UnityLoader.js'
)

export default function ShakaPlayer(props) {
  let { isIVQVisible, isUnityVisible } = props;

  let [hexColour, setHexColour] = useState('#ff0000');
  
  let videoRef = useRef(null);
  let uiRef = useRef(null);

  let onApplyHexColour = () => {
    console.log('hex colour should be applied')
    unityContent.send('GameHandler', 'ChangeColour', 'ff0000')
  }

  let onError = (e) => console.error('>>shaka event error', e);

  // useEffect(() => {
  //   !isUnityVisible && unityContent.remove();
  // }, [isUnityVisible])
  
  useEffect(() => {
    console.log('>>unity content', unityContent);
    unityContent.on('progress', () => console.log('unity is on progress'));

    unityContent.on('done', () => console.log('unity is done'));
    unityContent.on('finished', () => console.log('unity is finished'));

    unityContent.on('started', () => console.log('unity is starting'))

    unityContent.on('quitted', () => console.log('unity is quitted'))

    unityContent.on('ready', () => console.log('unity is ready'))

    unityContent.on('GameOver', () => console.log('unity is game over'))

    unityContent.on('loaded', () => console.log('unity is loaded'))
  }, [])

  useEffect(() => {
    let player = new shaka.Player(videoRef.current);
    let ui = new shaka.ui.Overlay(player, uiRef.current, videoRef.current);

    let uiConfig = {
      enableKeyboardPlaybackControls: true,
      controlPanelElements: [
        'play_pause',
        'quality',
        'time_and_duration',
        'loop',
        'mute',
        'volume',
        'spacer',
        'quality',
        'cast',
        'fullscreen',
        'overflow_menu',
      ],
      'overflowMenuButtons': [
        'captions',
        'quality',
        'play_pause',
        'playback_rate',
      ],
    };
    ui.configure(uiConfig);
    ui.getControls()

    player.addEventListener('error', onError);

    player.configure({
      drm: {
        servers: {
          'com.widevine.alpha': 'https://wv.service.expressplay.com/hms/wv/rights/?ExpressPlayToken=BQAO5vNIKdAAJDM0NTJhZjc1LWI5ZTUtNDkzMy04NDE0LTc5ZTk1NzA5ZmMxMgAAAGDrOqG_FEarVb8rn4BJId2iOsB3D38oDRXMVVvfyOqUgQ3iyNQCqwNfrAAWCvcf01DyM0fEe3r6TuZzQc10Qc0YRI2-HI3BhDW_uam1TIbNYRPTaNvUgl__ar-4bFlUTY_0s0CaNM-ejZQTvpovIZZWp_Vohg',
          // 'com.apple.fps.1_0': 'https://fp.service.expressplay.com/hms/fp/rights/?ExpressPlayToken=BgAO5vNIKe8AJDM0NTJhZjc1LWI5ZTUtNDkzMy04NDE0LTc5ZTk1NzA5ZmMxMgAAAGBchs10oXBoQkVFLsVXIOuh4VZeSkvxD13qzOCGHw_le_Ztug9j4o-ZEwT28BmLL_wp07HPx252iDEKGtw8tlts_mqyVzD2PwRU7hCXhrMi45_by93RVtWKnID8Xas_IbSuPszysFjdDfjfpva7NoQ1FXlxeQ',
          // 'com.microsoft.playready': 'https://pr.service.expressplay.com/playready/RightsManager.asmx?ExpressPlayToken=BwAO5vNIN1AAJDM0NTJhZjc1LWI5ZTUtNDkzMy04NDE0LTc5ZTk1NzA5ZmMxMgAAAJCESaR361tLKCdu8am4MsUkKliFnbB_7RE-CslE_W4OdrhZ53Hu_Wpreg9ay_Dh30SU9l79YSJg1IFv8-7QRLGURNKPQfVRVN8fNjHXl8nFDaGNV2eM3zF-0LbmN0UjLIMRVW8850IMBAC7EkwDvq2ELtqGyUoFrR6PZ9XWcX_1efHTNKXp0NjmeRipKNKAKAF11Yxf17WHgc8PUmmXzsSY_G5N9Q',
          // 'com.widevine.alpha': 'https://widevine-proxy.appspot.com/proxy',
        },
        advanced: {
          'com.widevine.alpha': {
            'videoRobustness': 'SW_SECURE_DECODE',
          },
        }
      }
    })
    
    async function loadAsset() {
      try {
        // await player.load('http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4')
        // await player.load('https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd')
        // await player.load('https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd')
        await player.load('https://rubel-video-cdn.ruangguru.com/RGVV-OMKP3UR83RJ/ca037c3e-1aa1-4e8a-9512-6bbae733955b/ca037c3e-1aa1-4e8a-9512-6bbae733955b.mpd')
        console.log('>>shaka video loaded')
      } catch(e) {
        console.error('shaka video catch', e)
      }
    }

    loadAsset();

    return () => {
      player.removeEventListener('error');
    }
  }, []);

  return (
    <>
      <div ref={uiRef}>
        <video
          ref={videoRef}
          // controls
          style={{ width: '100%', maxWidth: '100%' }}
          {...props}
        />
        {isIVQVisible && <View style={styles.overlay}>
          <Text>Howdy world!</Text>
        </View>}
        {isUnityVisible && <View style={styles.overlay}>
          <Unity unityContent={unityContent} />
        </View>}
      </div>
      {isUnityVisible && <>
        {/* <TextInput
          placeholder="Hex colour"
          value={hexColour}
          onChangeText={(hex) => setHexColour(hex)}
          style={{padding: 16, borderWidth: 1}}
        /> */}
        <Button
          title="Apply hex colour"
          onPress={() => onApplyHexColour()}
        />
      </>}
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'skyblue', 
    zIndex: 1000, 
    position: 'absolute', 
    bottom: 60, 
    top: 0, 
    left: 0, 
    right: 0,
  }
})
