import React, { useState, useEffect } from 'react';

const Average = () => {
    const [number, setNumber] = useState(0);
    const [count, setCount] = useState(0);
    const [average, setAverage] = useState();
    const addNums = () => {
        setNumber(number + 1)
        setCount(count + 1)
    }
    const minusNums = () => {
        setNumber(number - 1)
        setCount(count + 1)
    }

    const averages = () => {
        setAverage(number / count)
    }

    return (
        <div>
            <button onClick={addNums}>Add one</button>
            <button onClick={minusNums}>Minus one</button>
            <button onClick={averages}>Get average</button>
            <h1>{number}</h1>
            <h1>{average}</h1>
        </div>
    )
}

export default Average;