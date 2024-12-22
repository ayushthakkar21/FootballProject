import React from 'react';


const Loading = () => {
  return (
    <div
      className="fixed left-0 top-0 z-[99999999999999] flex h-[100vh] w-full items-center justify-center overflow-hidden bg-transparent"
    >
      <svg
        className="absolute top-0 h-[110vh] w-[100vw]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          id="preloaderSvg"
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        ></path>
      </svg>
      <div className="preloader-heading">
        <div
          className="load-text z-20 text-xl font-extralight uppercase tracking-[15px]"
        >
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
