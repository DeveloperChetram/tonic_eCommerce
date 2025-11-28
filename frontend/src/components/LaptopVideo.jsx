import React from 'react';

const LaptopVideo = () => (
  <video
    src="/Videos/lenevo2.mp4"
    autoPlay
    loop
    muted
    playsInline
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    }}
  />
);

export default LaptopVideo;

