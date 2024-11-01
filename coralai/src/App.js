import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import LoadingSpinner from './components/LoadingSpinner';
import { generateTickets } from './utils/generateTickets';
import { DragDropContext } from '@hello-pangea/dnd';
import throttle from 'lodash/throttle';
import './App.css';

const App = () => {
  const BATCH_SIZE = 1000; //change this to generate more tickets per batch
  const MAX_TICKETS = 10000;

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveMode, setLiveMode] = useState(false);

  // Initial load of a small batch, but set up to load up to 10,000
  useEffect(() => {
    const initialTickets = generateTickets(BATCH_SIZE);
    setTickets(initialTickets);
    setLoading(false);
  }, []);

  const toggleLiveMode = () => setLiveMode(!liveMode);

  const loadMoreTickets = () => {
    if (tickets.length < MAX_TICKETS) {
      const newTickets = generateTickets(BATCH_SIZE);
      setTickets(prevTickets => [...prevTickets, ...newTickets]);
    }
  };

  const clearDoneTickets = () => {
    setTickets(prevTickets => prevTickets.filter(ticket => ticket.status !== "Done"));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === draggableId) {
        return { ...ticket, status: destination.droppableId };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  // Throttled function for updating tickets in Live Mode
  const throttledSetTickets = throttle((newTickets) => setTickets(newTickets), 1000);

  useEffect(() => {
    if (liveMode) {
      const interval = setInterval(() => {
        const updatedTickets = tickets.map(ticket => {
          // Logic for randomly changing status according to FSA rules
          const newStatus = getRandomStatusChange(ticket.status);
          return { ...ticket, status: newStatus };
        });
        throttledSetTickets(updatedTickets);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [liveMode, tickets]);

  // Helper function to randomly change ticket status based on allowed transitions
  const getRandomStatusChange = (currentStatus) => {
    const transitions = {
      "To Do": ["In Progress"],
      "In Progress": ["Blocked", "Done"],
      "Blocked": ["In Progress"],
      "Done": []
    };
    const possibleStatuses = transitions[currentStatus];
    if (possibleStatuses.length === 0) return currentStatus;
    return possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)];
  };

  return (
    <div className="App">
      <Header liveMode={liveMode} toggleLiveMode={toggleLiveMode} clearDoneTickets={clearDoneTickets} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <KanbanBoard liveMode={liveMode} tickets={tickets} loadMoreTickets={loadMoreTickets} />
        </DragDropContext>
      )}
    </div>
  );
};

export default App;
