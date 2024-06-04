import React from 'react';
import './BackButton.css';

function BackButton() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className='back-button'>
      <button onClick={goBack}>back</button>
    </div>
  );
}

export default BackButton;
