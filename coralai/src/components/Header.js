import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ liveMode, toggleLiveMode, clearDoneTickets }) => (
  <header className="header">
    <h1>Kanban Dashboard</h1>
    <div className="header-controls">
      <label className="live-mode-toggle">
        Live Mode
        <input type="checkbox" checked={liveMode} onChange={toggleLiveMode} />
      </label>
      <button onClick={clearDoneTickets} className="clear-done-button">Clear All Done</button>
    </div>
  </header>
);

Header.propTypes = {
  liveMode: PropTypes.bool.isRequired,
  toggleLiveMode: PropTypes.func.isRequired,
  clearDoneTickets: PropTypes.func.isRequired,
};

export default Header;
