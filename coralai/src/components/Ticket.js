import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from '@hello-pangea/dnd';
import './Ticket.css';

const Ticket = ({ ticket, index }) => (
  <Draggable draggableId={ticket.id} index={index}>
    {(provided) => (
      <div 
        className="ticket" 
        ref={provided.innerRef} 
        {...provided.draggableProps} 
        {...provided.dragHandleProps}
      >
        <h3 className="ticket-title">{ticket.title}</h3>
        <p className="ticket-description">{ticket.description}</p>
      </div>
    )}
  </Draggable>
);

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Ticket;
