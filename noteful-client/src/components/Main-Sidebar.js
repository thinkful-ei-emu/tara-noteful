import React from 'react';
import { NavLink } from 'react-router-dom';

function MainSidebar(props) {
  const folderLinks = props.folders.map((folder) => {
    return (
      <NavLink key={folder.id}
        to={`/folder/${folder.id}`}
        onClick={() => props.setCurrentFolder(folder.id)}>
        <p>{folder.name}</p>
      </NavLink>
    );
  });

  return (
    <div className='main-sidebar'>
      <NavLink onClick={() => props.setCurrentFolder('')} to='/'><p>Home</p></NavLink>
      {folderLinks}
    </div>
  )
}

export default MainSidebar;