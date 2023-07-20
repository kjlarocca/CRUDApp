import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [zooAnimals, setZooAnimals] = useState([]);
  const [animalType, setAnimalType] = useState('');
  const [animalName, setAnimalName] = useState('');
  const [animalDetails, setAnimalDetails] = useState('');

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
        animaldetails: animalDetails,
      });
      setZooAnimals([...zooAnimals, response.data]);
      setAnimalType('');
      setAnimalName('');
      setAnimalDetails('');
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
        animaldetails: animalDetails,
      });
      fetchZooAnimals();
      setAnimalType('');
      setAnimalName('');
      setAnimalDetails('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to KJ's Zoo</h1>
  
      <div className="zooAnimals">
        <h2>Current Zoo Animals</h2>
        {zooAnimals.length > 0 ? (
          <ul>
            {zooAnimals.map((animal) => (
              <ul key={animal._id}>
                <strong>Animal Type:</strong> {animal.animaltype}{' '}
                <strong>Animal Name:</strong> {animal.animalname}{' '}
                <strong>Animal Details:</strong> {animal.details}{' '}
                <button onClick={() => handleDelete(animal._id)}>Remove</button>
                <button onClick={() => handleUpdate(animal._id)}>Update</button>
              </ul>
            ))}
          </ul>
        ) : (
          <p>No zoo animals found.</p>
        )}
      </div>
      
      <div className="newAnimalForm">
        <h2>New Animal Submission</h2>
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
        <label>Animal Details:</label>
        <input
          type="text"
          name="animalDetails"
          value={animalDetails}
          onChange={(e) => setAnimalDetails(e.target.value)}
        />
  
        <button onClick={handleSubmit}>Add Animal</button>
      </div>
    </div>
  );
  }
  
  export default App;
  
