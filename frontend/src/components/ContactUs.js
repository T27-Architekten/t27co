import React from "react";

const ContactUs = () => {
  return (
    <div
      className="contact-container"
      style={{
        position: "relative",
        paddingTop: "100px",
        textAlign: "center",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img
        src="/static/contactus.png"
        alt="ContactUs"
        style={{
          top: "0",
          left: "0",
          position: "absolute",
          width: "100%",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      />
      <h1>This is Contact Us page.</h1>
      {/* <img
        className="contact-image"
        src={require("../assets/front/contactus.png")}
        alt=""
      /> */}
    </div>
  );
};

export default ContactUs;
