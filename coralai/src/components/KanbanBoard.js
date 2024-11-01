import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import { generateTickets } from '../utils/generateTickets';
import useFakeTicketTransition from '../hooks/useFakeTicketTransition';
import './KanbanBoard.css';

const KanbanBoard = ({ liveMode }) => {
  const [tickets, setTickets] = useState([]);
  const statuses = ["To Do", "In Progress", "Blocked", "Done"];

  useEffect(() => {
    const generatedTickets = generateTickets();
    setTickets(generatedTickets);
  }, []);

  useFakeTicketTransition(tickets, setTickets, liveMode);

  const ticketCounts = statuses.reduce((acc, status) => {
    acc[status] = tickets.filter(ticket => ticket.status === status).length;
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      {statuses.map(status => (
        <KanbanColumn 
          key={status} 
          status={status} 
          tickets={tickets.filter(ticket => ticket.status === status)} 
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
