import React from 'react';

function Main(props) {
  return (
    <div>
      <main>
        {props.children}
      </main>
    </div>
  )
}

export default Main;