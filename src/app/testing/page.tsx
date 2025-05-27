"use client"
import { useEffect, useState } from 'react';

const ExampleComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return <div>{message}</div>;
};

export default ExampleComponent;
