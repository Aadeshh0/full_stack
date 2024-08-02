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

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here. Example: { "data": ["A","C","z"] }'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Filter Response:</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Alphabets')}
                onChange={() => handleOptionChange('Alphabets')}
              /> Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Numbers')}
                onChange={() => handleOptionChange('Numbers')}
              /> Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Highest alphabet')}
                onChange={() => handleOptionChange('Highest alphabet')}
              /> Highest alphabet
            </label>
          </div>
          <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;