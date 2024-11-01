import React, { useState } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const App = () => {
  const [liveMode, setLiveMode] = useState(false);

  const toggleLiveMode = () => {
    setLiveMode(!liveMode);
  };

  return (
    <div className="App">
      <Header liveMode={liveMode} toggleLiveMode={toggleLiveMode} ticketCounts={{}} />
      <KanbanBoard liveMode={liveMode} />
    </div>
  );
};

export default App;
