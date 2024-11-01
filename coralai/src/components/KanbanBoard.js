import React from 'react';
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, liveMode, loadMoreTickets }) => {
  const statuses = ["To Do", "In Progress", "Blocked", "Done"];
  return (
    <div className="kanban-board">
      {statuses.map(status => (
        <KanbanColumn 
          key={status} 
          status={status} 
          tickets={tickets.filter(ticket => ticket.status === status)} 
          liveMode={liveMode} 
          loadMoreTickets={loadMoreTickets}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
