import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function SignUp({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:3001/users/signup', {
        username,
        password,
      });
      // Sign-up successful, automatically sign in
      onSignIn();
    } catch (error) {
      console.error(error);
      // Handle sign-up error
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

function SignIn({ onSignIn, onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      onSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = () => {
    onSignUp();
  };

  return (
    <div className="signin">
      <h1>Welcome, Zookeepers</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [zooAnimals, setZooAnimals] = useState([]);
  const [animalType, setAnimalType] = useState('');
  const [animalName, setAnimalName] = useState('');
  const [animalDetails, setAnimalDetails] = useState('');

  useEffect(() => {
    if (isSignedIn) {
      fetchZooAnimals();
    }
  }, [isSignedIn]);

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

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignUp = () => {
    setIsSignedIn(true);
  };

  return (
    <div className="App">
      {isSignedIn ? (
        <>
          <h1>Welcome to KJ's Zoo</h1>

          <div className="zooAnimals">
            <h2>Current Zoo Animals</h2>
            {zooAnimals.length > 0 ? (
              <ul>
                {zooAnimals.map((animal) => (
                  <ul key={animal._id}>
                    <strong>Animal Type:</strong> {animal.animaltype}{' '}
                    <strong>Animal Name:</strong> {animal.animalname}{' '}
                    <strong>Animal Details:</strong> {animal.animaldetails}{' '}
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
        </>
      ) : (
        <SignIn onSignIn={handleSignIn} onSignUp={handleSignUp} />
      )}
    </div>
  );
}

export default App;
