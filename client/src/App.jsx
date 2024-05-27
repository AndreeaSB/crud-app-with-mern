import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  let URL = "http://localhost:3000";

  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState('');

  useEffect(() => {
    Axios.get(`${URL}/read`).then((response) => {
      setFoodList(response.data);
    });
  }, []); // -> [] means that useEffect is called once

  const updateFood = (id) => {
    Axios.put(`${URL}/update`, { id: id, foodName: newFoodName });
  };

  const addToList = () => {
    Axios.post(`${URL}/insert`, { foodName: foodName, days: days });
  };

  const deleteFood = (id) => {
    console.log('delete fct')
    Axios.delete(`${URL}/delete/${id}`);
  }

  return (
    <div className="app">
      <h1>CRUD app with MERN</h1>

      <label>Food name:</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <label>Days since you ate it:</label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      <button onClick={addToList}>Add to list</button>
      <h1>Food List</h1>

      {foodList.map((val, key) => {
        return (
          <div key={key}>
            <h2>{val.foodName}</h2>
            <h2>{val.daysSinceIAte}</h2>
            <input
              type="text"
              placeholder="New food name"
              onChange={(event) => {
                setNewFoodName(event.target.value);
              }}
            />
            <button onClick={() => updateFood(val._id)}>Update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
