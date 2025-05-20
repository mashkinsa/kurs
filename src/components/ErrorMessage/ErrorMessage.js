import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <span>⚠️</span>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;