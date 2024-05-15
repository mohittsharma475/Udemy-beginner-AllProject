import { useState } from "react";
import "./Accordion.css";
import PropTypes from "prop-types";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function Accordian() {

  const [currOpen,setCurrOpen] =  useState(null);

  return (
    <div>
      {faqs.map((faq, index) => {
        return (
          <AccordionItem
            key={faq.title}
            num={index + 1}
            title={faq.title}
            currOpen= {currOpen}
            onOpen = {setCurrOpen}
          >{faq.text}</AccordionItem>
        );
      })}
    </div>
  );
}

function AccordionItem({ num, title ,currOpen,onOpen,children}) {
  // const [isOpen, setIsOpen] = useState(false);

  const isOpen =num===currOpen;

  function handleToggle(){
    onOpen(isOpen?null:num);
  }

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={handleToggle}
    >
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {/* 
      <div className="content-box" style={isOpen?{}:{display:"none"}}>{text}</div> */}
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

AccordionItem.propTypes = {
  num: PropTypes.number.isRequired,
  currOpen:PropTypes.number.isRequired,
  onOpen:PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children:PropTypes.string.isRequired
};

export default Accordian;
