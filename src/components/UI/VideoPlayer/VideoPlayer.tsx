'use client';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, previewImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="max-w-[98%] mx-auto h-[220px] sm:h-[320px] tabletplus:h-[556px] rounded-sub-block-12 tablet:rounded-sub-block-24 relative">
      {!isPlaying && (
        <div
          className="absolute transform scale-[1.02] inset-0 bg-cover bg-center cursor-pointer"
          style={{
            backgroundImage: `url(${previewImage})`,
            borderRadius: 'inherit',
          }}
          onClick={handlePlay}
        >
          <div className="flex items-center justify-center w-full h-full">
            <svg
              width="116"
              height="116"
              viewBox="0 0 116 116"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform transition duration-300 ease-in-out hover:scale-105"
            >
              <rect
                x="2.5"
                y="2.5"
                width="111"
                height="111"
                rx="55.5"
                stroke="white"
                strokeWidth="5"
              />
              <path
                d="M74.1502 56.8164C75.0613 57.3425 75.0613 58.6575 74.1502 59.1836L50.9502 72.5781C50.0391 73.1041 48.9002 72.4466 48.9002 71.3945V44.6055C48.9002 43.5534 50.0391 42.8959 50.9502 43.4219L74.1502 56.8164Z"
                stroke="white"
                strokeWidth="5"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="w-full h-full rounded-sub-block-24">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={true}
          pip={true}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
