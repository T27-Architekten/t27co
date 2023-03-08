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
          right: "0",
          width: "30%",
          top: "10%",
        }}
      >
        {props.alert.msg}
      </div>
    )
  );
}
