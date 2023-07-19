import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [zooAnimals, setZooAnimals] = useState([]);
  const [animalType, setAnimalType] = useState('');
  const [animalName, setAnimalName] = useState('');

  useEffect(() => {
    fetchZooAnimals();
  }, []);

  const fetchZooAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:3001/zooanimals');
      setZooAnimals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/zooanimals', {
        animaltype: animalType,
        animalname: animalName,
      });
      setZooAnimals([...zooAnimals, response.data]);
      setAnimalType('');
      setAnimalName('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/zooanimals/${id}`);
      fetchZooAnimals();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/zooanimals/${id}`, {
        animaltype: animalType,
        animalname: animalName,
      });
      fetchZooAnimals();
      setAnimalType('');
      setAnimalName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to KJ's Zoo</h1>

      <div className="form">
        <label>Animal Type:</label>
        <input
          type="text"
          name="animalType"
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
        />
        <label>Animal Name:</label>
        <input
          type="text"
          name="animalName"
          value={animalName}
          onChange={(e) => setAnimalName(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="zooAnimals">
        <h2>Zoo Animals</h2>
        {zooAnimals.length > 0 ? (
          <ul>
            {zooAnimals.map((animal) => (
              <li key={animal._id}>
                <strong>Animal Type:</strong> {animal.animaltype}{' '}
                <strong>Animal Name:</strong> {animal.animalname}
                <button onClick={() => handleDelete(animal._id)}>Remove</button>
                <button onClick={() => handleUpdate(animal._id)}>Update</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No zoo animals found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
