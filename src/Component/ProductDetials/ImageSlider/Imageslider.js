import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageSlider = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="rounded w-100  my-2 mx-0 " style={{height:"500px"}}
            src={image}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageSlider;