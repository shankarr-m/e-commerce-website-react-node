import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Componets/Header';
import '../Css/cart.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row } from 'react-bootstrap';
import ReactStarRatings from 'react-star-ratings'
import { useNavigate } from 'react-router-dom';


const Cart = () =>{

  const nav = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  
  // Use an object to store stock quantity for each product
  const [stockQuantities, setStockQuantities] = useState({});

  useEffect(() => {
    const value = localStorage.getItem("userId");
    if (value) {
      setUserId(value);
    }

    if (userId) {
      axios.get(`http://localhost:3001/products/cart-items/${userId}`)
        .then(res => {
          console.log(res);
          setCartItems(res.data.cartItem);
          
          // Initialize stock quantities for each product
          const initialStockQuantities = {};
          res.data.cartItem.forEach(item => {
            initialStockQuantities[item._id] = 1;
          });
          setStockQuantities(initialStockQuantities);
        })
        .catch(error => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [userId]);

  const incrementStock = (productId) => {
    const itemStockQuantity = stockQuantities[productId];
    const maxStockQuantity = cartItems.find(item => item._id === productId).stockQuantity;
    
    if (itemStockQuantity < maxStockQuantity) {
      setStockQuantities(prevStockQuantities => ({
        ...prevStockQuantities,
        [productId]: itemStockQuantity + 1
      }));
    }
  };

  const decrementStock = (productId) => {
    const itemStockQuantity = stockQuantities[productId];
    if (itemStockQuantity > 0) {
      setStockQuantities(prevStockQuantities => ({
        ...prevStockQuantities,
        [productId]: itemStockQuantity - 1
      }));
    }
  };

  const handleSubmit = (productId, stock, data) => {
    const amount = stock * data.price;
  
    localStorage.setItem("productId", data._id);
    localStorage.setItem("stock", stock);
    localStorage.setItem("amount", amount);
  
    nav('/online-shopping/projct-in/93.61.06.09/buynow');
  };

  return (
    <>
      <Header />
      <section className='react-cart'>
        <div>
          <h2 className='ms-2'>Cart Items</h2>
          {cartItems.length === 0 ? (
            <h1 className='text-center'>No items in the cart.</h1>
          ) : (
            <Container>
              <Row>
                {cartItems.map((item, index) => (
                  <div className="card mb-3" key={index} style={{ maxHeight: "400px" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={item.imageURL} className="img-fluid rounded-start justify-content-center" alt="..." height="280px" width="260px" style={{ padding: "20px", marginLeft: "30px" }} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.productName}</h5>
                          <p className="card-text">Description: {item.description}</p>
                          <p className="card-text">
                            <ReactStarRatings
                              rating={item.rating}
                              starRatedColor="yellow"
                              numberOfStars={5}
                              starDimension="30px"
                              name='rating'
                            />
                          </p>
                          <h6 className="card-text">Rs: {item.price}</h6>
                          <p className="card-text">Available Stock: {item.stockQuantity}</p>
                          <div className='stock-value p-3'>
                            <button className='btn btn-primary border rounded-start w-0' onClick={() => decrementStock(item._id)}>-</button>
                            <input type='text' value={stockQuantities[item._id]} className='input-stock' readOnly />
                            <button className='btn btn-primary border rounded-start w-0 me-4' onClick={() => incrementStock(item._id)}>+</button>
                            <button className='btn btn-primary' onClick={() => handleSubmit(item._id, stockQuantities[item._id], item)}>Buy Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Row>
            </Container>
          )}
        </div>
      </section>
    </>
  );

}

export default Cart