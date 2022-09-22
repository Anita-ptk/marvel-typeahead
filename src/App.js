import React from "react";
import './App.css';
import Typeahead from "./Components/Typeahead";

function App() {
  return (
    <div className="App">
      <Typeahead placeholder="Search terms" button="SEARCH"/>
    </div>
  );
}

export default App;
