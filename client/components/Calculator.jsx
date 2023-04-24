import { useState } from 'react';
import './Calculator.scss';
import axios from 'axios';

const Calculator = () => {
  const [calculation, setCalculation] = useState('');
  const [output, setOutput] = useState('');
  const actions = ['/', '*', '+', '-', '.'];
  const [isLoading, setIsLoading] = useState(false);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  const updateCalculation = (value) => {
    if (
      (actions.includes(value) && calculation === '') ||
      (actions.includes(value) && actions.includes(calculation.slice(-1)))
    ) {
      return;
    }
    setCalculation(calculation + value);

    if (!actions.includes(value)) {
      setOutput(eval(calculation + value).toString());
    }
  };

  const calculate = () => {
    setCalculation(eval(calculation).toString());
  };

  const deleteChar = () => {
    if (calculation === '') {
      return;
    }
    const value = calculation.slice(0, -1);
    setCalculation(value);
    if (value) {
      if (actions.includes(value[value.length - 1])) {
        setOutput(eval(value.slice(0, -1)).toString());
      } else {
        setOutput(eval(value).toString());
      }
    } else {
      setOutput('');
    }
  };

  const clear = () => {
    setCalculation('');
    setOutput('');
  };

  const saveToMemory = async () => {
    setIsLoading(true);
    await authFetch.post('memory', { valueToSave: output });
    setIsLoading(false);
  };

  const loadFromMemory = async () => {
    setIsLoading(true);
    const { data } = await authFetch('memory');
    if (data.value) {
      setCalculation(data.value.toString());
      setOutput(data.value.toString());
    }
    setIsLoading(false);
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalculation(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  return (
    <div className='calc-grid'>
      {isLoading ? (
        <div className='loading-container'>
          <div className='lds-dual-ring'></div>
        </div>
      ) : (
        <div className='output'>
          {calculation || '0'}
          {output ? <span className='preRes'>{output}</span> : ''}
        </div>
      )}

      <div>
        <div className='ops'>
          <button
            onClick={() => {
              updateCalculation('/');
            }}
          >
            /
          </button>
          <button
            onClick={() => {
              updateCalculation('*');
            }}
          >
            *
          </button>
          <button
            onClick={() => {
              updateCalculation('+');
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              updateCalculation('-');
            }}
          >
            -
          </button>
        </div>
        <div className='ops'>
          <button onClick={saveToMemory}>Save</button>
          <button onClick={loadFromMemory}>Read</button>
          <button onClick={clear}>Clear</button>
          <button onClick={deleteChar}>
            <img
              width={40}
              height={40}
              src='https://cdn-icons-png.flaticon.com/512/159/159805.png'
            />
          </button>
        </div>
        <div className='dig'>
          {createDigits()}
          <button
            onClick={() => {
              updateCalculation('.');
            }}
          >
            .
          </button>
          <button
            onClick={() => {
              updateCalculation('0');
            }}
          >
            0
          </button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
