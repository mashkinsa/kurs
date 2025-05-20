import React from 'react';

const Loader = ({ fullScreen = false }) => (
  <div className={`loader-container ${fullScreen ? 'full-screen' : ''}`}>
    <div className="loader"></div>
  </div>
);

export default Loader;