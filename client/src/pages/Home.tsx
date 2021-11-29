import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [welcomeMsg, setWelcomeMsg] = useState<string>('Loading...');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/start');
        setWelcomeMsg(res.data.msg);
      } catch (err) {
        setWelcomeMsg('Server is asleep today...');
      }
    })();
  }, []);

  return (
    <div className="App-header">
      <img width="400px" height="400px" src={'logo-world-large.png'} />
      <p>{welcomeMsg}</p>
    </div>
  );
};

export default Home;
