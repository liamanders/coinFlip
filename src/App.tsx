import { useState } from 'react';
import './App.css';
import coin from './assets/coinFlip.gif';

function App() {
  const [result, setResult] = useState<string>('');
  const [coinFlip, setCoinFlip] = useState<boolean>();


  fetch('https://api.adviceslip.com/advice')
  .then((response) => response.json())
  .then((data) => {
    setResult(data.slip.advice);
  })
  .catch((error) => {
    console.error('Error fetching advice: ', error)
  });

const flipCoin = (e: React.FormEvent) => {
  e.preventDefault();
  setCoinFlip(true);
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      let coinResult = Math.random();
      if (coinResult > 0.5) {
        resolve('You Win!')
      } else {
        reject('You Lose!')
      }
        setCoinFlip(false);
    });
  }, 1500);
  
};


  return (
    <>
      {coinFlip && 
      <div className='coinFlipLayer'>
        <img src={coin} className= 'img' alt="Coin Flipping" />
      </div>}
      <h1>Coin Flip and Advice</h1>
      <button onClick={flipCoin}>Flip Coin</button>
      <h3>{result}</h3>
    </>
  );
}

export default App;