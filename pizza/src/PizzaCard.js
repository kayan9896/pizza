import React from 'react';

const PizzaCard = ({ pizza }) => {
  return (
    <div>
      <img src={pizza.image} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <p>{pizza.ingredients.join(', ')}</p>
    </div>
  );
};

export default PizzaCard;