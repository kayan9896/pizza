import React, { useState,useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';

const pizzas = [
  {
    id: 1,
    name: 'Margherita',
    ingredients: ['Tomato sauce', 'Mozzarella cheese'],
    image: 'https://example.com/margherita.jpg',
    prices: {
      small: 10.99,
      medium: 14.99,
      large: 18.99
    }
  },
  {
    id: 2,
    name: 'Pepperoni',
    ingredients: ['Tomato sauce', 'Mozzarella cheese', 'Pepperoni'],
    image: 'https://example.com/pepperoni.jpg',
    prices: {
      small: 12.99,
      medium: 16.99,
      large: 20.99
    }
  },
  // Add more pizzas here
];

function Cart({ pizza, onAddToOrder }) {
  const [size, setSize] = useState('small');

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleAddToOrder = () => {
    onAddToOrder(pizza, size);
  };

  return (
    <div className="cart">
      <img src={pizza.image} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <p>{pizza.ingredients.join(', ')}</p>
      <select value={size} onChange={handleSizeChange}>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <button onClick={handleAddToOrder}>
        Add to order
        <span>${pizza.prices[size]}</span>
      </button>
    </div>
  );
}



function OrderRow({ index, expanded, setExpanded, pizzas, order, setOrder }) {
  // ... (other states and functions remain the same)

  const [showModal, setShowModal] = useState(false);
  const selectedPizza = order.find(item => item.index === index)?.pizza;

  const handleAddToOrder = (pizza, size) => {
    
    setOrder((prevOrder) => [...prevOrder, { pizza, size, index }]);
    setExpanded(null); // Collapse the grid once an item is added
  };

  const handleRemoveFromOrder = () => {
    setOrder((prevOrder) => prevOrder.filter((item, i) => item.index !== index));
    
    setExpanded(null);      // Collapse the row after removal
  };
  const handleRowClick = () => {
    if (selectedPizza) {
      setShowModal(true);
    } else {
      setExpanded(expanded === index ? null : index);
    }
  };

  return (
    <div className="order-row" onClick={handleRowClick}>
      {selectedPizza ? (
        <>
          <span>
            {selectedPizza.name} ({order.find(item => item.index === index)?.size})
          </span>
          <button onClick={handleRemoveFromOrder}>
            <span>${selectedPizza.prices[order.find(item => item.index === index)?.size]}</span>
            X
          </button>
        </>
      ) : (
        <>
          <span>Select pizza</span>
          <button>+</button>
        </>
      )}
      {expanded === index && (
        <div className="pizza-grid">
          {pizzas.map((pizza) => (
            <Cart key={pizza.id} pizza={pizza} onAddToOrder={handleAddToOrder} />
          ))}
        </div>
      )}

      {/* Modal for displaying pizza details */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Pizza Details"
        className="pizza-modal"
        overlayClassName="pizza-modal-overlay"
      >
        {selectedPizza && (
          <div>
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            <img src={selectedPizza.image} alt={selectedPizza.name} />
            <h2>{selectedPizza.name}</h2>
            <p>{selectedPizza.ingredients.join(', ')}</p>
            <p>
              Price ({order.find(item => item.index === index)?.size}): ${selectedPizza.prices[order.find(item => item.index === index)?.size]}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

function App() {
  const [expanded, setExpanded] = useState(null);
  const [order, setOrder] = useState([]);

  const total = order.reduce((acc, item) => acc + item.pizza.prices[item.size], 0);

  return (
    <div className="app">
      <nav>
        <ul>
          <li><a href="#">Deals</a></li>
          <li><a href="#">Pizzas</a></li>
          <li><a href="#">Drinks</a></li>
        </ul>
      </nav>
      <div className="ordering-area">
        {[...Array(5)].map((_, index) => (
          <OrderRow
            key={index}
            index={index}
            expanded={expanded}
            setExpanded={setExpanded}
            pizzas={pizzas}
            order={order}
            setOrder={setOrder}
          />
        ))}
      </div>
      {order.length > 0 && (
        <div className="checkout-bar">
          <span>Total: ${total.toFixed(2)}</span>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default App;