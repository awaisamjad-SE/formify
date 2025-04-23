import React, { useState } from 'react';

function Greeting() {
  const [status, setStatus] = useState('guest');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const renderGreeting = () => {
    switch (status) {
      case 'guest':
        return <h1>Welcome, Guest!</h1>;
      case 'user':
        return <h1>Welcome, User!</h1>;
      case 'admin':
        return <h1>Welcome, Admin!</h1>;
      default:
        return <h1>Unknown Status</h1>;
    }
  };

  return (
    <div>
      {renderGreeting()}
      <button onClick={() => handleStatusChange('guest')}>Guest</button>
      <button onClick={() => handleStatusChange('user')}>User</button>
      <button onClick={() => handleStatusChange('admin')}>Admin</button>
    </div>
  );
}

export default Greeting;
