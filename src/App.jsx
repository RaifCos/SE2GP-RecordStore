import { useState } from 'react'
import './App.css'
import MainComponent from './MainComponent';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <MainComponent />
    </div>
  )
}

export default App
