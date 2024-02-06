import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [message, setMessage] = useState('');
  const [userSelectedColor, setUserSelectedColor] = useState('');
  const [generatedColors, setGeneratedColors] = useState([]);
  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    generateColors();
  }, []);

  const generateColors = () => {
    // Simulate a delay before showing the colors
    setTimeout(() => {
      setShowColors(true);
      const newColors = [];
      for (let i = 0; i < 3; i++) {
        newColors.push(pickRandomColor());
      }
      setGeneratedColors(newColors);
      setTargetColor(pickRandomColor());
    }, 1000); // 1-second delay
  };

  const pickRandomColor = () => {
    const colors = ['pink', 'red', 'white', 'green', 'yellow', 'purple','blue'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleColorSelection = (color) => {
    setUserSelectedColor(color);
    checkColorMatch(color);
  };

  const checkColorMatch = (color) => {
    if (color === targetColor) {
      setMessage('Congratulations! You guessed it right!');
    } else {
      setMessage('Oops! Try again.');
    }
  };

  const handleNewGame = () => {
    setShowColors(false); // Hide colors before generating new ones
    setMessage('');
    setUserSelectedColor('');

    // Introduce a delay before generating new colors
    setTimeout(() => {
      generateColors();
    }, 1000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Game</h1>
        <p>Generate Random Colors:</p>
        {showColors && (
          <div className="color-container">
            {generatedColors.map((color, index) => (
              <div
                key={index}
                className={`color ${userSelectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelection(color)}
              ></div>
            ))}
          </div>
        )}
        <p>{message}</p>
        <button onClick={handleNewGame}>Lets Roll</button>
      </header>
    </div>
  );
}

export default App;
