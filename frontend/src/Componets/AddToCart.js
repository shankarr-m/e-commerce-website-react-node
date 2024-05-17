import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const AddToCart = ({productId,userId}) => {
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async () => {
    setIsLoading(true);
    try {
      
      await axios.post('http://localhost:3001/auth/addcart', { userId, productId })
      .then(res=>{
        console.log(res)
      })
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Error adding item to cart. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={addToCart} disabled={isLoading} className='btn btn-outline-primary me-2'>
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

export default AddToCart