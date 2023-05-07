import React from 'react';
import './App.css';
import Card from './components/Card';

const App: React.FC = () => ( // specify that App is a functional component that doesn't accept any props and returns a ReactNode
  <div className="app-container">
    <Card />
  </div>
);

export default App;
