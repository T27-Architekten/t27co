import React from "react";

export default function Alert(props) {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show text-center`}
        role="alert"
        style={{
          position: "fixed",
          zIndex: "10000",
          right: "3%",
          width: "30%",
          top: "10%",
          backgroundColor: "#d1b08f",
          borderColor: "#2c3337",
          color: "#2c3337",
          fontWeight: 600,
        }}
      >
        <p>{props.alert.msg}</p>
      </div>
    )
  );
}
