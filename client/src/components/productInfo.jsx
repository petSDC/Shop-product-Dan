import React from 'react';
import PhotoCarousel from './photoCarousel.jsx';

const ProductInfo = (props) => {
  return (
    <div className="productInfoWrapper">
      <PhotoCarousel imgs_url={props.prodInfo[1].imgs_url} prodId={props.prodInfo[1].id} />
      <div>
        <div className="productName text-truncate" title={props.prodInfo[0]}>{props.prodInfo[0]}</div>
        <div className="bold">${props.prodInfo[1].price}</div>
      </div>
    </div>
  );
};

export default ProductInfo;

