import React from 'react';

export default function NoteSidebar(props) {
  return (
    <div className='note-sidebar'>
      <button onClick={() => {
        return props.history.goBack();
      }}>
        Go Back
      </button>
    </div>
  );
}
