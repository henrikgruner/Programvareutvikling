import React from "react";

const NumbersWithTitle = ({ label, text }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto"
      }}
    >
      <span style={{ fontStyle: "italic" }}>{label}</span>
      <span>{text}</span>
    </div>
  );
};

export default NumbersWithTitle;
