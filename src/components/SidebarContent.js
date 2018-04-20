import React from 'react';
import HeaderSidebar from './HeaderSidebar';
import BodySidebar from './BodySidebar';

const SidebarContent = (props) => {

  return (
    <div>
      <HeaderSidebar/>
      <BodySidebar handleMenu={props.handleMenu}/>
    </div>
  );
};

export default SidebarContent;