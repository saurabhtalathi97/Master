import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';


import BoardContainer from "./containers/BoardContainer/BoardContainer.jsx";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginSignUp from "./components/Authentication/LoginSignUp.jsx";


function App() {
  const [userConnected, setUserConnected] = useState(false)

  useEffect(() => {
    const currentUserId = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
    setUserConnected(currentUserId !== null && currentUserId !== undefined);
    console.log(currentUserId)
    console.log(document.location);
  }, [])


  return (
        <Routes>
          {!userConnected ? (
              <Route path="/" element={<LoginSignUp />}/>
          ) : (
              <Route path="/board" element={<BoardContainer />}/>
          )}
        </Routes>
  );
}

export default App;
