import React from "react";
import "./scss and css/Modal.scss";

// <Modal heading={heading} content={content} handleFunction = {handleFunction} button={button}/>
const Modal = (props) => {
  return (
    props.modal && (
      <div
        id="open-modal"
        className="modal-window"

        // style={{ visibility: modelVis }}
      >
        <div>
          <h1>
            <i className="fa-solid fa-trash" style={{ color: " #2c3337" }} />
            &nbsp;
            {props.modal?.heading}
          </h1>
          <hr />
          {/* -------------- content */}
          <p>{props.modal?.content}</p>

          <div className="action-modal-bttns">
            <button
              className="action-button"
              onClick={() => {
                props.modal.handleFunction();
                props.setModal(null);
              }}
            >
              {props.modal?.button}
            </button>
            <button
              className="action-button"
              // -------------------------- set props.setModal value to null to disappear the modal. setModal is declared in App.js.
              onClick={() => props.setModal(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
