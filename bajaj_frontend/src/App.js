import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = 'Your_Roll_Number';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post(`${API_URL}/bfhl`, parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const filterResponse = () => {
    if (!response) return null;
    const filtered = {};
    if (selectedOptions.includes('Alphabets')) filtered.alphabets = response.alphabets;
    if (selectedOptions.includes('Numbers')) filtered.numbers = response.numbers;
    if (selectedOptions.includes('Highest alphabet')) filtered.highest_alphabet = response.highest_alphabet;
    return filtered;
  };

 