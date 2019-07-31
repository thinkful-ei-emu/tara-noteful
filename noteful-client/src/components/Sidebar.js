import React from 'react';

function Sidebar(props) {

  return (
  <div>
    <nav>
      {props.children}
    </nav>
  </div>
  );
}

export default Sidebar;