import React from 'react';

const LaptopVideo = () => (
  <video
    src="https://ik.imagekit.io/chetram/lenevo.mp4"
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

