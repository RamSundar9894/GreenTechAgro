import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import './Order.module.scss';

const OrderPage = () => {
  const { orders, setCart } = useContext(CartContext);

  const handleOrderAgain = (order) => {
    // Add logic to handle ordering again (e.g., adding items back to cart)
    setCart(order.products.map(product => ({
      ...product,
      quantity: 1 // or any default quantity
    })));
  };

  if (!orders) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container-a">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <>
            {orders.map((order) => (
              <div key={order.orderNumber}>
                <h2>Order #{order.orderNumber}</h2>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity (kg)</th>
                      <th>Price per kg</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>₹{product.price.toFixed(2)}</td>
                        <td>₹{product.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="order-summary">
                  <h2>Order Total: ₹{order.orderTotal.toFixed(2)}</h2>
                  <div className="order-summary-button-container">
                    <button className="btn__order-again" onClick={() => handleOrderAgain(order)}>
                      Order Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
