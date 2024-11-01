import { useEffect } from 'react';
import { isValidTransition, transitions } from '../utils/fsa';

const useFakeTicketTransition = (tickets, setTickets, liveMode) => {
  useEffect(() => {
    if (!liveMode) return;

    const interval = setInterval(() => {
      setTickets(prevTickets => {
        const randomIndex = Math.floor(Math.random() * prevTickets.length);
        const ticket = { ...prevTickets[randomIndex] };
        const possibleTransitions = transitions[ticket.status] || [];

        if (possibleTransitions.length > 0) {
          const newStatus = possibleTransitions[Math.floor(Math.random() * possibleTransitions.length)];
          ticket.status = newStatus;
          
          const updatedTickets = prevTickets.map((t, index) =>
            index === randomIndex ? ticket : t
          );
          return updatedTickets;
        }
        return prevTickets;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [liveMode, tickets, setTickets]);
};

export default useFakeTicketTransition;
