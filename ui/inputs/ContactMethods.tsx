"use client";

import { useState } from "react";
import { SOCIAL_CONTACT_METHODS } from "../../data/consts";
import { useLoggedInUser } from "../../providers/userProvider";
import {
  ISocialContactProvider,
  ISocialContactMethod,
} from "../../types/types";
import ContactMethodModal from "../modals/ContactMethodModal";

export default function ContactMethods() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();
  const [isContactMethodModalOpen, setIsContactMethodModalOpen] =
    useState<boolean>(false);

  const [activeContactMethod, setActiveContactMethod] = useState<
    undefined | ISocialContactProvider
  >();

  const handleClick = (contactMethod: ISocialContactProvider) => {
    setIsContactMethodModalOpen(true);
    setActiveContactMethod(contactMethod);
  };

  if (!loggedInUser) return <div>Loading ...</div>;

  const hasContactMethod = (method: ISocialContactMethod) =>
    !!loggedInUser[`${method.provider}_link`];

  return (
    <>
      <div className="flex justify-between">
        <strong className="flex items-center">
          Contact Methods
          {/* <span className="ml-1">
            <FcInfo id="my-element" data-tooltip-content="hello world" />
          </span> */}
          :
        </strong>
        <div className="flex">
          {SOCIAL_CONTACT_METHODS.map((contactMethod, idx) => (
            <div
              className={`cursor-pointer text-lg hover:opacity-100 ${
                hasContactMethod(contactMethod) ? "" : "opacity-60"
              }`}
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
        contactMethod={activeContactMethod!}
      />
    </>
  );
}
