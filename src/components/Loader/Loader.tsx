import React from 'react';
// import './loader.css'; // Если вам нужен импорт CSS, можно раскомментировать

const Loader: React.FC = () => {
  return (
    <div className="backdropL fixed top-0 left-0 w-screen h-screen bg-black z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <img
          src="/preloader/logoBig.png"
          className="w-2/3 sm:w-1/2 mx-auto"
          alt="Loading..."
          style={{ maxWidth: "100%", height: "auto" }}
        />
        {/* Loader v.0.1.3 by cyanidium */}
      </div>
    </div>
  );
};

export default Loader;
