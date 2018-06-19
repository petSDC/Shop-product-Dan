import React from 'react';

const ShopInfo = (props) => { 
  return (
    <div className="shopInfoWrapper">
      <img className="shopLogo" src={props.info.shop_image_url} alt="" />
      <div className="bold">{props.info.name}</div>
      <div className="shopLocation">{props.info.city}, {props.info.state}</div>
    </div>
  );
};

export default ShopInfo;

