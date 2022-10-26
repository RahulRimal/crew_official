import axios from "axios";
import React from "react";

const Khalti = () => {
  const callKhalti = async () => {
    try {
      const response = await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        // "https://khalti.com/api/v2/payment/initiate/",

        {
          public_key: "Key test_public_key_78965ea539884431b8e9172178d08e91",
          //   public_key: "Key test_secret_key_0183cc6e1899464fb97ecd0eb37f0211",
          mobile: "9808144809",
          transaction_pin: "1027",
          amount: 2000,
          product_identity: "fjdkiefkel",
          product_name: "test name",
        },
        {
          //   "Access-Control-Allow-Origin": "*",
          Authorization: "Key test_public_key_78965ea539884431b8e9172178d08e91",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const callBanking = async () => {
    try {
      const response = await axios.get(
        "https://khalti.com/api/bank/?has_ebanking=true"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button type="button" onClick={callKhalti}>
        Pay
      </button>
      <button type="button" onClick={callBanking}>
        Bank
      </button>
    </>
  );
};

export default Khalti;
