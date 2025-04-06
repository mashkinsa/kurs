import React from 'react';

const ProductCard = ({ title, price, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price} руб.</p>
    </div>
  );
};

export default ProductCard;