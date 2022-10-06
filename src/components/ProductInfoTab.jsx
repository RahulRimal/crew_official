import React, { useState } from "react";
import styled from "styled-components";

const ProductInfoTab = ({ product }) => {
  const { description, technical_specification } = product;

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Prouct Description
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Terms &amp; Conditions
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <p>{description || "No description available for this product"}</p>
            {technical_specification.length > 0 && (
              <h2>Technical Specifications</h2>
            )}
            <ul>
              {technical_specification.map((spec, idx) => {
                const { specification } = spec;
                return (
                  <li key={idx}>
                    {" "}
                    <p>{specification}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <p>
              <strong>Site - Pickup: </strong> This Product is available for
              Site - Pickup as well as Site - Delivery.
            </p>
            <br />
            <p>
              <strong>For Delivery: </strong> You need to book the product 2
              days prior &amp; inform us, whereas Delivery Charges is extra
              based on your location from our location. Actual Address of the
              site-pickup will be mentioned on the Invoice Received after
              booking
            </p>
            <br />
            <p>
              <strong>Documents Required &amp; ID Verification</strong>. Anyone
              Valid Govt ID is mandatory We will take Post Dated Cheque of the
              replacement value of the product.
            </p>
            <br />
            <ul>
              <strong> Valid Documents: </strong>
              <li>Voter Card</li>
              <li> Driving License</li>
              {/* <li> Passport (No Aadhar card required)</li> */}
              <li>Local Residence Proof</li>
            </ul>
            <br />
            <p>
              <strong> Security Deposit: </strong>We have No Cash Security
              Policy, instead, we will take a cheque and a valid Govt ID. We
              will take a <strong> Post Dated Cheque</strong> of the Replacement
              Value of the Product and a Valid ID. Security deposit does not
              include rent. It takes care of damages, loss or mishandling (if
              any). Post Dated Cheque will be handed over to you as soon as you
              return the product (without Damage).
            </p>
            <br />
            <p>
              <strong> Bookings, Cancellation &amp; Refunds:</strong> For
              Confirmed Booking and Holding a rented equipment, Booking amount
              mentioned must be paid, the rest amount will be paid in advance at
              the time of site-pickup or delivery.
            </p>
            <br />
            <br />
            <ul>
              Canceling a product is liable to some charges as mentioned:
              <li>
                {" "}
                <strong> 7 Days Prior:</strong> 10% of Total Rent
              </li>
              <li>
                <strong> 2 Days Prior:</strong> 20% of Total Rent
              </li>{" "}
              <li>
                {" "}
                <strong> 1 Day Prior: </strong> 30% of Total Rent{" "}
              </li>
            </ul>
            <br />
            <p>
              Any refunds related issues will be solved within 7-10 Working Days
              after confirmation of Refund.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    background: var(--primary-white);
    border: 1px solid var(--border-gray);
  }

  .bloc-tabs {
    display: flex;
  }
  .tabs {
    padding: 1.2rem;
    text-align: center;
    width: 50%;
    background: rgba(128, 128, 128, 0.075);
    cursor: pointer;
    box-sizing: content-box;
    position: relative;
    outline: none;
    font-size: 1.6rem;
    font-weight: 500;
  }
  .tabs:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.274);
  }

  .active-tabs {
    background: var(--primary-white);
    border-bottom: 1px solid transparent;
    color: var(--primary-color);
    font-size: 1.6rem;
    font-weight: 500;
  }

  .active-tabs::before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 5px;
    background: var(--primary-color);
  }

  button {
    border: none;
  }
  .content-tabs {
    flex-grow: 1;
  }
  .content {
    background: var(--primary-white);
    padding: 1.6rem;
    width: 100%;
    height: 100%;
    display: none;

    h2 {
      margin-top: 1.2rem;
    }
    p,
    ul {
      font-size: 1.4rem;
      letter-spacing: 1px;
      line-height: 2.4rem;
    }

    li {
      display: flex;
    }

    li::before {
      content: "✔";
      margin-right: 0.2rem;
      color: var(--primary-color);
      /* display: flex; */
    }
  }
  .active-content {
    display: block;
  }
`;

export default ProductInfoTab;
