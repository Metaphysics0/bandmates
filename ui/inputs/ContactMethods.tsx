"use client";

import { useState } from "react";
import { AVAILABLE_CONTACT_METHODS } from "../../data/consts";
import { IAvailableContactMethod } from "../../types/types";
import ContactMethodModal from "../modals/ContactMethodModal";

export default function ContactMethods() {
  const [isContactMethodModalOpen, setIsContactMethodModalOpen] =
    useState<boolean>(false);

  const [activeContactMethod, setActiveContactMethod] = useState<
    undefined | IAvailableContactMethod
  >();

  const handleClick = (contactMethod: IAvailableContactMethod) => {
    setIsContactMethodModalOpen(true);
    setActiveContactMethod(contactMethod);
  };

  return (
    <>
      <div className="flex flex-col">
        <strong className="flex items-center">
          Contact Methods
          {/* <span className="ml-1">
            <FcInfo id="my-element" data-tooltip-content="hello world" />
          </span> */}
          :
        </strong>
        <div className="flex">
          {AVAILABLE_CONTACT_METHODS.map((contactMethod, idx) => (
            <div
              className="cursor-pointer text-lg"
              key={idx}
              onClick={(e) => handleClick(contactMethod.provider)}
            >
              <contactMethod.icon />
            </div>
          ))}
        </div>
      </div>
      <ContactMethodModal
        isOpen={isContactMethodModalOpen}
        setIsOpen={setIsContactMethodModalOpen}
        contactMethod={activeContactMethod}
      />
    </>
  );
}
