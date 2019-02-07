import React from 'react';

const Summary = ({ activeTodos }) => (
  <div className="todo-summary">
    <strong>Active todos:</strong> {activeTodos}
  </div>
);

export default Summary;
