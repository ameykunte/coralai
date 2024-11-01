import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ liveMode, toggleLiveMode, ticketCounts }) => (
  <header className="header">
    <h1>Kanban Dashboard</h1>
    <div className="header-controls">
      <label className="live-mode-toggle">
        Live Mode
        <input 
          type="checkbox" 
          checked={liveMode} 
          onChange={toggleLiveMode} 
        />
      </label>
      <div className="ticket-counts">
        {Object.entries(ticketCounts).map(([status, count]) => (
          <span key={status} className="ticket-count">
            {status}: {count}
          </span>
        ))}
      </div>
    </div>
  </header>
);

Header.propTypes = {
  liveMode: PropTypes.bool.isRequired,
  toggleLiveMode: PropTypes.func.isRequired,
  ticketCounts: PropTypes.object.isRequired,
};

export default Header;
