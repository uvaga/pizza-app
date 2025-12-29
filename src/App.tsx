import './App.css'
import Button from './components/Button/Button';
import {type MouseEvent, useState } from 'react'

function App() {
    const [counter, setCounter] = useState<number>(0);

    const addCounter = (e: MouseEvent) => {
        console.log(e)
    }
    return (
        <>
            <Button onClick={addCounter}>Кнопка</Button>
        </>
    )
}

export default App
