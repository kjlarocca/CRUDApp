import './App.css';

function App() {
  return ( 
  <div className="App">
    <h1>ZooPets</h1>

    <div className = 'form'>
      <label>Animal Type:</label>
    <input type='text' name='animalType' />
    <label>Animal Name:</label>
    <input type='text' name='animalName' />

    <button>Submit</button>
    </div>
  </div>
  );
}

export default App;
