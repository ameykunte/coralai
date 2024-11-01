import React from 'react';
import PropTypes from 'prop-types';
import './Ticket.css';

const Ticket = ({ title, description }) => (
  <div className="ticket">
    <h3 className="ticket-title">{title}</h3>
    <p className="ticket-description">{description}</p>
  </div>
);

Ticket.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Ticket;
