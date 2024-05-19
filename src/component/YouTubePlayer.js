import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId, onReady}) => {
  const opts = {
    height: '730',
    width: '1300',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={onReady}
    />
  );
};

export default YouTubePlayer;
