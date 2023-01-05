import React, {useEffect, useState} from 'react'

export default function App() {

  const [counter, Setcounter] = useState(0);
  
  console.log("this is component")
  return (
    <div>
    <div>{counter}</div>
    <button onClick={function() {Setcounter(counter+1)}}>Click me</button>
    </div>
  )
}

