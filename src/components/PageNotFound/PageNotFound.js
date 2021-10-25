import React from "react";
import { Link } from "react-router-dom";
import image from "./404.png";

function PageNotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>This page is not found</h1>
      <Link to="/">Go To Home</Link>
      <img
        src={image}
        alt="404"
        style={{ alignSelf: "center", width: "50%" }}
      />
    </div>
  );
}

export default PageNotFound;
