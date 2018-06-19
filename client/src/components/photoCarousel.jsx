import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const PhotoCarousel = (props) => {
  const carouselId = `carousel${props.prodId}`;

  const slides = props.imgs_url.map((url, index) => {
    let altText = `Slide ${index + 1}`;
    if (index === 0) {
      return (
        <div className="carousel-item active" key={index.toString()} >
          <img className="d-block w-100" src={url} alt={altText} />
        </div>
      );
    }
    return (
      <div className="carousel-item" key={index.toString()} >
        <img className="d-block w-100 prodImg" src={url} alt={altText} />
      </div>
    );
  });

  const indicators = props.imgs_url.map((url, index) => {
    if (index === 0) {
      return <li data-target={`#${carouselId}`} data-slide-to={index} className="active" key={index.toString()} />;
    }
    return <li data-target={`#${carouselId}`} data-slide-to={index} key={index.toString()} />;
  });

  return (
    <div id={carouselId} className="carousel slide" data-ride="carousel" data-interval="false">
      <ol className="carousel-indicators indicator">
        {indicators}
      </ol>
      <div className="carousel-inner">
        {slides}
      </div>
      <a className="carousel-control-prev" href={`#${carouselId}`} role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href={`#${carouselId}`} role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div> 
  );
};

export default PhotoCarousel;

