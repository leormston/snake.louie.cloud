import React from 'react';
import './App.css';
import Board from './components/board';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

var localTheme = ""
if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "dark");
  localTheme = "dark"
}
else {
  localTheme = localStorage.getItem("theme");
}
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

function App() {

  const [cssTheme, setCssTheme] = useState(localTheme);
  return (
    <div className="App">
      <ThemeProvider theme={cssTheme === "light" ? lightTheme : darkTheme}>
      <Navbar theme={cssTheme === "light" ? lightTheme : darkTheme} cssTheme={cssTheme} setCssTheme={setCssTheme}/>
      <div className={cssTheme}>

      
      <body style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Arial, sans-serif"}}>
        <div >
            <h1>Snake Game</h1>
            <hr/> 
            <Board/>
        </div>
      </body>
      <Footer/>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
