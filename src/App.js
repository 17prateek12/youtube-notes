import React, { useState,useEffect } from 'react';
import YouTubePlayer from './component/YouTubePlayer';
import Notes from './component/Notes';
import axios from 'axios';

const App = () => {
  const [videoId, setVideoId] = useState('EAR7De6Goz4'); // default video ID
  const [player, setPlayer] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');


  useEffect(() => {
    const fetchVideoTitle = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet',
            id: videoId,
            key: process.env.REACT_APP_API_Key,
          },
        });
        const { title, description } = response.data.items[0].snippet;
        setVideoTitle(title);
        setVideoDescription(description);
      } catch (error) {
        console.error('Error fetching video details:', error.response ? error.response.data : error.message);
      }
    };

    if (videoId) {
      fetchVideoTitle();
    }
  }, [videoId]);

  const onPlayerReady = (event) => {
    setPlayer(event.target);
  };

  const changeVideo = () => {
    const newVideoId = prompt('Enter YouTube Video ID:');
    setVideoId(newVideoId);
  };

  return (
    <div className='max-w-[1300px] mx-auto '>
      <p className='text-4xl font-bold my-12 text-center'>YouTube Video Player with Notes</p>
      <YouTubePlayer videoId={videoId} onReady={onPlayerReady} />.
      <button className='bg-blue-500 w-[140px] h-[50px] flex justify-center items-center 
      text-white rounded-2xl hover:bg-blue-400 mt-4' onClick={changeVideo}>Change Video</button>
      <p className='text-2xl font-bold'>{videoTitle}</p>
      <p className='text-base'>{videoDescription}</p>
      {player && <Notes videoId={videoId} player={player} />}
    </div>
  );
};

export default App;
