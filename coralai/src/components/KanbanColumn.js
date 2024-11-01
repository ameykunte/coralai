import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Ticket from './Ticket';
import './KanbanColumn.css';

const KanbanColumn = ({ status, tickets }) => {
  const [visibleTickets, setVisibleTickets] = useState([]);
  const [batchSize, setBatchSize] = useState(20);

  const loadMoreTickets = () => {
    setVisibleTickets(prev => [
      ...prev, 
      ...tickets.slice(prev.length, prev.length + batchSize)
    ]);
  };

  useEffect(() => {
    setVisibleTickets(tickets.slice(0, batchSize));
  }, [tickets, batchSize]);

  return (
    <div className="kanban-column" onScroll={(e) => {
      if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
        loadMoreTickets();
      }
    }}>
      <h2>{status} ({tickets.length})</h2>
      <div className="ticket-list">
        {visibleTickets.map(ticket => (
          <Ticket key={ticket.id} title={ticket.title} description={ticket.description} />
        ))}
      </div>
    </div>
  );
};

KanbanColumn.propTypes = {
  status: PropTypes.string.isRequired,
  tickets: PropTypes.array.isRequired,
};

export default KanbanColumn;
