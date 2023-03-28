import React from "react";
import "./Loader.css";
import Lottie from "lottie-react";
import loader from "../../utils/images/42205-cooking-your-food.json";

export default function Loader() {
  return (
    <div className="loader">
      <Lottie animationData={loader} loop={true} />
    </div>
  );
}
