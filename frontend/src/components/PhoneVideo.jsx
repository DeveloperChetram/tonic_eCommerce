import React from 'react';

const PhoneVideo = () => (
  <video
    src="https://ik.imagekit.io/chetram/boat.mp4"
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

