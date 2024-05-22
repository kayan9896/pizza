import React, { useState } from 'react';
import PizzaCard from './PizzaCard';

const OrderRow = ({ pizzas }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div onClick={toggleExpanded}>
        <span>Select pizza</span>
        <button>+</button>
      </div>
      {expanded && (
        <div>
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderRow;