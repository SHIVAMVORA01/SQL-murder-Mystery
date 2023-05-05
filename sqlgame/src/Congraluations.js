import React from 'react';

function Congratulations({ handleClose }) {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Congratulations!</h2>
        <p>You have completed all levels of the game.</p>
        <button className='modal-close' onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default Congratulations;
