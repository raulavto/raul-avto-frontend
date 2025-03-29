'use client';

import ReactPlayer from 'react-player';

const VideoBlock = () => {
  return (
    <div className="relative h-[300px] tablet:h-auto w-full overflow-hidden rounded-b-[10px] tablet:rounded-none tablet:rounded-r-[10px] ">
      {/* <ReactPlayer
        url="https://youtu.be/9vAOjXLT4hc?si=8H2Iri2yeg4gY6_x&rel=0"
        width="100%"
        height="100%"
        // playing={true}
        // muted={true} // Вимкнений звук, щоб не блокувався автозапуск
        playsinline={true}
        controls={true}
        className="w-full h-full"
      /> */}
          <div className="relative w-full h-full">
        {/* <div style={{ paddingTop: "177.78%%", position: "relative" }}> */}
          <iframe
            src="https://player.vimeo.com/video/1070497408?h=bedd978b2a&badge=0&autopause=0&player_id=0&app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title=""
          ></iframe>
        {/* </div> */}
      </div>
      <div className="hidden tablet:flex absolute top-6 right-7 bg-[#E2011A] rounded-xl">
        <p className="text-white uppercase text-[16px] mac:text-[20px] font-semibold p-4 mac:py-[26px]  mac:px-8">
          Чим більше місць - тим вищий шанс
        </p>
      </div>
    </div>
  );
};

export default VideoBlock;
