import { useState } from 'react';
import './App.css';
import coin from './assets/coinFlip.gif';

function App() {
  const [result, setResult] = useState<string>('');
  const [coinFlip, setCoinFlip] = useState<boolean>();
  const [input, setInput] = useState<string>('');


const flipCoin = () => {
    return new Promise((resolve, reject) => {
      let coinResult = Math.random();
      if (coinResult > 0.5) {
        resolve('You Win!')
      } else {
        reject('You Lose!')
      }
    });
};

const getAdvice = async (e: React.FormEvent) => {
  e.preventDefault();
  setCoinFlip(true);
  setTimeout(async () => {
    try {
      const coinFlipResult = await flipCoin();
      console.log(coinFlipResult)
      const response = await fetch(`https://api.adviceslip.com/advice/${input}`)
      const data = await response.json();
      setResult(data.slip.advice)
    } catch (error) {
      console.error('Error fetching advice', error)
    } finally {
      setCoinFlip(false);
    }
  }, 1500);
}


  return (
    <>
      {coinFlip && 
      <div className='coinFlipLayer'>
        <img src={coin} className= 'img' alt="Coin Flipping" />
      </div>}
      <h1>Coin Flip and Advice</h1>
      <form onSubmit={getAdvice}>
      <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a number 1 - 224"
              required
            />
      <button type="submit"> Flip Coin</button>
      </form>
      <h3>{result}</h3>
    </>
  );
}

export default App;