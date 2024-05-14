/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Travel.css";

// const itemsPacked = [
//   {
//     id: 1,
//     name: "Passport",
//     quantity: 2,
//     packed: false,
//   },
//   {
//     id: 2,
//     name: "shocks",
//     quantity: 12,
//     packed: false,
//   },
//   {
//     id: 3,
//     name: "charger",
//     quantity: 12,
//     packed: true,
//   },
// ];

export function Logo() {
  return <h1 className="logo">FarAway.com ✈️</h1>;
}
export function Form({ onAddItems }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]);

  // const handleAddItems = (item)=>{
  //   setItems((items)=>[...items,item])
  // }

  const addItemToList = (e) => {
    e.preventDefault();

    if (!itemName) return;

    const newItem = {
      id: Math.floor(Math.random() * 100) + 1,
      name: itemName,
      packed: false,
      quantity: quantity,
    };

    onAddItems(newItem);
    setQuantity(1);
    setItemName("");
  };

  return (
    <form className="add-form" onSubmit={addItemToList}>
      <h6>What do you need for your Trip?</h6>
      <select onChange={(e) => setQuantity(+e.target.value)} value={quantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item Name"
        onChange={(e) => setItemName(e.target.value)}
        value={itemName}
      />
      <button>Add</button>
    </form>
  );
}
export function PackingList({ items, handleDelete, handlePacked,handleClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;

  if (sortBy === "input") {
    sortedItem = items;
  } else if (sortBy === "name") {
    sortedItem = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "packed") {
    sortedItem = items.slice().sort((a,b)=>Number(b.packed)-Number(a.packed));
  }

  return (
    <div className="packing-list">
      <ul>
        {sortedItem.map((item) => {
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                value={item.packed}
                onClick={() => handlePacked(item.id)}
              />
              <span
                style={item.packed ? { textDecoration: "line-through" } : null}
              >
                {item.quantity} {item.name}
              </span>
              <button onClick={() => handleDelete(item.id)}>❌</button>
            </li>
          );
        })}
      </ul>

      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Order</option>
          <option value="name">Sort by Name</option>
          <option value="packed">Sort by Packed status</option>
        </select>

        <button onClick={handleClearList}>Clear List</button>
      </div>
    </div>
  );
}

export function Stats({ items }) {
  if (!items.length)
    return (
      <p className="footer">
        <em>Start adding some items to your packing list</em>
      </p>
    );

  const itemlength = items.length;
  const itemPacked = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((itemPacked / itemlength) * 100);

  return (
    <footer className="footer">
      <em>
        {percentage === 100
          ? "You got everthing! Ready to go"
          : `You have ${itemlength} items on your list, you already packed
        ${itemPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
