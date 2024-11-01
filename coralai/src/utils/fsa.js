export const transitions = {
    "To Do": ["In Progress"],
    "In Progress": ["Blocked", "Done"],
    "Blocked": ["In Progress"],
  };
  
  export const isValidTransition = (from, to) => {
    return transitions[from]?.includes(to);
  };
  