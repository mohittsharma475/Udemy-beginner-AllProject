import { useState } from "react";
import { DateCounter } from "./component/DateCounter/DateCounter";
import FlashCards from "./component/FlashCard/FlashCard";
import { Form, Logo, PackingList, Stats } from "./component/Travel/Travel";
import Accordian from "./component/AccordionComponent/Accordion";

function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handlePacked = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = () => {
    let confimed = window.confirm("Are you sure you want to delete all items?");
    confimed ? setItems([]) : null;
  };

  return (
    <div>
      <Logo />
      <Accordian/>
      <DateCounter />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handlePacked={handlePacked}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
      <FlashCards />
    </div>
  );
}

export default App;
