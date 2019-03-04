import React from "react";

const NumbersWithTitle = ({ label, text, subtextStyles }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto"
      }}
    >
      <span style={{ fontStyle: "italic" }}>{label}</span>
      <span style={subtextStyles}>{text}</span>
    </div>
  );
};

export default NumbersWithTitle;
