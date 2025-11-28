import React from 'react';

const PhoneVideo = () => (
  <video
    src="/Videos/boat.mp4"
    autoPlay
    loop
    muted
    playsInline
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      borderRadius: 'inherit',
    }}
  />
);

export default PhoneVideo;

