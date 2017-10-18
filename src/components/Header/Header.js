import React from 'react';

import './Header.css';

const Header = ({ title, imageUrl }) => {
  return (
    <header className="app-header">
      <img src={imageUrl+'1962.png'} className="App-logo" alt="logo" />
      <h1 className="app-title">{title}</h1>
    </header>
  )
}

export default Header;
