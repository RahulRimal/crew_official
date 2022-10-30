import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";

import {
  ProductImagesGallery,
  ProductInfoTab,
  ProductOptionsSelection,
  Loading,
  RelatedProducts,
} from "../components";

import { useParams } from "react-router-dom";

import { mainUrl } from "../constants";

const SingleProduct = ({ productId }) => {
  const params = useParams();

  const [equipment, setEquipment] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let id = null;
    if (productId) id = productId;
    else id = params.id;
    axios
      .get(`${mainUrl}equipments/${id}`)
      .then((response) => {
        setEquipment(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id, productId]);

  const { featured_image, images } = equipment;

  if (featured_image !== undefined) {
    const imageToAdd = { image: featured_image };
    // if (!images.includes(imageToAdd)) {
    if (JSON.stringify(images[0]) !== JSON.stringify(imageToAdd)) {
      images.unshift(imageToAdd);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="product-section">
        <ProductImagesGallery pictures={images} />
        <ProductOptionsSelection product={equipment} />
        <ProductInfoTab product={equipment} />
      </div>
      {equipment.category && params.id && (
        <RelatedProducts id={equipment.category.id} />
      )}
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  .product-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    row-gap: 2.4rem;
  }

  /**************************/
  /* BELOW 1344px (Smaller desktops) */
  /**************************/

  @media (max-width: 84em) {
    grid-template-columns: 1.5fr 1fr;
  }

  /**************************/
  /* BELOW 1200px (Landscape Tablets) */
  /**************************/

  @media (max-width: 75em) {
  }

  /**************************/
  /* BELOW 944px (Tablets) */
  /**************************/

  @media (max-width: 59em) {
  }

  /**************************/
  /* BELOW 704px (Smaller tablets) */
  /**************************/

  @media (max-width: 44em) {
    .product-section {
      grid-template-columns: 1.2fr 1fr;
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 34em) {
    .product-section {
      grid-template-columns: 1fr;
    }
  }
`;

export default SingleProduct;
