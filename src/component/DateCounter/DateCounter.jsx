import  { useState } from 'react';
import './DateCounter.css'; // Import the CSS file with styles

export function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function handleReset() {
    setCount(0);
    setStep(1);
  }

  const date = new Date('June 21 2027');
  date.setDate(date.getDate() + count);

  return (
    <div className="date-counter"> {/* Apply class for styling */}
      <div className="step-control"> {/* Step control with responsive design */}
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>Step: {step}</span>
      </div>

      <div className="count-control"> {/* Controls for increment/decrement */}
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? 'Today is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {(count !== 0 || step !== 1) && (
        <div className="reset-button"> {/* Reset button with responsive design */}
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}
