import React from "react";
import styled from "styled-components";

const Gallery = ({ images }) => {
  return (
    <Wrapper>
      <div className="gallery">
        {images.map((image) => {
          const { id, src } = image;
          return <img key={id} src={src} alt="gallery image" />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .gallery {
    column-count: 3;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default Gallery;
