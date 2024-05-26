import './App.css'
import { useEffect, useState } from 'react'
import Axios from 'axios'

function App() {

  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [foodList, setFoodList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3000/read').then((response) => {
      setFoodList(response.data)
    })
  }, []) // -> [] means that useEffect is called once

  const addToList = () => {
    Axios.post('http://localhost:3000/insert', {foodName: foodName, days: days})
  }
  return (
    <div className='app'>
      <h1>CRUD app with MERN</h1>

      <label>Food name:</label>
      <input type="text" onChange={(event) => {
        setFoodName(event.target.value)
      }}/>
      <label>Days since you ate it:</label>
      <input type='number' onChange={(event) => {
        setDays(event.target.value)
      }}/>
      <button onClick={addToList}>Add to list</button>
      <h1>Food List</h1>

      {foodList.map((val,key) => {
        return (<div key={key}>
          <h2>{val.foodName}</h2>
          <h2>{val.daysSinceIAte}</h2>
        </div>)
      })}
    </div>
  )
}

export default App
