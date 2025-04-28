import { useState } from 'react';
import './App.css'; // Your custom CSS file
import NavBar from './assets/NavBar';
import Dashboard from './assets/Dashboard';
import TopBar from './assets/TopBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     <NavBar/>
      <Dashboard/>
    </>
  );
}

export default App;

// this simple dashboard that why i not use react-router-dom 
//and redux toolkit 
//to start dashboard you use npm run dev commad