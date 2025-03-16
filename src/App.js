import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [linateFlights, setLinateFlights] = useState([]);
  const [malpensaFlights, setMalpensaFlights] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);

    fetch('/api/flights?airport=LIN')
      .then(res => res.json())
      .then(data => setLinateFlights(data.flights || []))
      .catch(err => console.error('Errore Linate:', err));

    fetch('/api/flights?airport=MXP')
      .then(res => res.json())
      .then(data => setMalpensaFlights(data.flights || []))
      .catch(err => console.error('Errore Malpensa:', err));
  }, []);

  const addTask = () => {
    if (!input.trim()) return;
    const newTasks = [...tasks, { text: input, completed: false }];
    setTasks(newTasks);
    setInput('');
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <div className="dashboard">
      <h1>Dashboard To-Do & Voli</h1>
      <div className="task-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Aggiungi un task"
        />
        <button onClick={addTask}>Aggiungi</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              <span>{task.text}</span>
              <button onClick={() => deleteTask(index)}>Elimina</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="monitoring-section">
        <h2>Arrivi Linate (LIN)</h2>
        {linateFlights.length > 0 ? (
          <ul>
            {linateFlights.map((flight, index) => (
              <li key={index}>
                {flight.flightNumber} - {flight.airline} da {flight.origin} ({flight.scheduled}) - {flight.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessun dato disponibile</p>
        )}
        <h2>Arrivi Malpensa (MXP)</h2>
        {malpensaFlights.length > 0 ? (
          <ul>
            {malpensaFlights.map((flight, index) => (
              <li key={index}>
                {flight.flightNumber} - {flight.airline} da {flight.origin} ({flight.scheduled}) - {flight.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessun dato disponibile</p>
        )}
      </div>
    </div>
  );
}

export default App;