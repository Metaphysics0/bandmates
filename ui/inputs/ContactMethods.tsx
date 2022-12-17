"use client";

import { useState } from "react";
import { FaDiscord, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { AVAILABLE_CONTACT_METHODS } from "../../data/consts";
import { IAvailableContactMethod } from "../../types/types";
import ContactMethodModal from "../modals/ContactMethodModal";

export default function ContactMethods() {
  const handleClick = (contactMethod: IAvailableContactMethod) =>
    setIsContactMethodModalOpen(contactMethod);

  const [isContactMethodModalOpen, setIsContactMethodModalOpen] = useState<
    false | IAvailableContactMethod
  >(false);

  return (
    <>
      <div className="flex flex-col">
        <strong>Contact Methods:</strong>
        <div className="flex">
          {AVAILABLE_CONTACT_METHODS.map((contactMethod) => (
            <div
              className="cursor-pointer"
              key={contactMethod}
              onClick={(e) => handleClick(contactMethod)}
            >
              {iconMap[contactMethod]}
            </div>
          ))}
        </div>
      </div>
      <ContactMethodModal
        isOpen={isContactMethodModalOpen}
        setIsOpen={setIsContactMethodModalOpen}
      />
    </>
  );
}

const iconMap = {
  whatsapp_link: <FaWhatsapp />,
  instagram_link: <FaInstagram />,
  discord_link: <FaDiscord />,
};
