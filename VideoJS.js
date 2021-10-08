import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import videojs from "video.js";

import 'videojs-contrib-eme';

import "video.js/dist/video-js.css";

export const VideoJS = ( props ) => {
  let [status, setStatus] = useState({ isPlaying: false });

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
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
    </div>

    //   <div data-vjs-player>
    //       {/* <TouchableOpacity activeOpacity={0.9} onPress={() => {
    //   if (!!playerRef.current) {
    //     status.isPlaying ? playerRef.current.pause() : playerRef.current.play();
    //     setStatus(s => ({ ...s, isPlaying: !s.isPlaying }));
    //   }
    // }}> */}
    //     <video ref={videoRef} className="video-js vjs-big-play-centered" />
    // {/* </TouchableOpacity> */}
    //   </div>
  );
}

export default VideoJS;