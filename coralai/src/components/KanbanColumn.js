import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from '@hello-pangea/dnd';
import { FixedSizeList as List } from 'react-window';
import Ticket from './Ticket';
import './KanbanColumn.css';

const KanbanColumn = ({ status, tickets, loadMoreTickets }) => {
  const listRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
          loadMoreTickets();
        }
      }
    };

    if (listRef.current) {
      listRef.current.addEventListener('scroll', handleScroll);
      return () => listRef.current.removeEventListener('scroll', handleScroll);
    }
  }, [loadMoreTickets]);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div className="kanban-column" data-status={status} {...provided.droppableProps} ref={provided.innerRef}>
          <h2>{status} ({tickets.length})</h2>
          <div className="ticket-list" ref={listRef}>
            <List
              height={500}
              itemCount={tickets.length}
              itemSize={120}
              width="100%"
            >
              {({ index, style }) => (
                <div style={style}>
                  <Ticket key={tickets[index].id} ticket={tickets[index]} index={index} />
                </div>
              )}
            </List>
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

KanbanColumn.propTypes = {
  status: PropTypes.string.isRequired,
  tickets: PropTypes.array.isRequired,
  loadMoreTickets: PropTypes.func.isRequired,
};

export default KanbanColumn;
