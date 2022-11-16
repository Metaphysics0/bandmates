"use client";

import { useState } from "react";
import Modal from "react-modal";

export default function SignUpModal() {
  Modal.setAppElement("body");
  const [modalIsOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  return (
    <div>
      <button
        onClick={toggleModal}
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        Sign Up!
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="Example Modal"
      >
        <div className="z-50">
          <h2>Hello</h2>
          <button onClick={toggleModal}>close</button>
          <div>I am a modal</div>
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </div>
      </Modal>
    </div>
  );
}
