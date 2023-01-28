"use client";

import { Fragment, useState } from "react";
import { Tooltip } from "react-tooltip";
import { SOCIAL_CONTACT_METHODS } from "../../data/consts";
import { IProfile } from "../../types/database";
import {
  ISocialContactProvider,
  ISocialContactMethod,
} from "../../types/types";
import ContactMethodModal from "../modals/ContactMethodModal";

export default function ContactMethods({
  user,
  forProfileModal = false,
}: {
  user: IProfile;
  forProfileModal?: boolean;
}) {
  const [isContactMethodModalOpen, setIsContactMethodModalOpen] =
    useState<boolean>(false);

  const [activeContactMethod, setActiveContactMethod] = useState<
    undefined | ISocialContactProvider
  >();

  const openContactMethodModal = (contactMethod: ISocialContactProvider) => {
    setIsContactMethodModalOpen(true);
    setActiveContactMethod(contactMethod);
  };

  const hasContactMethod = (method: ISocialContactMethod) =>
    !!user[`${method.provider}_link`];

  const ContactMethodsForProfileForm = () => (
    <Fragment>
      {SOCIAL_CONTACT_METHODS.map((contactMethod, idx) => (
        <div
          className={`cursor-pointer text-lg hover:opacity-100 ${
            hasContactMethod(contactMethod) ? "" : "opacity-50"
          }`}
          key={idx}
          onClick={(e) => openContactMethodModal(contactMethod.provider)}
        >
          <contactMethod.icon />
        </div>
      ))}
    </Fragment>
  );

  const ContactMethodsForProfileModal = () => (
    <Fragment>
      {SOCIAL_CONTACT_METHODS.map((contactMethod, idx) => {
        const socialLink = hasContactMethod(contactMethod)
          ? contactMethod.linkPrefix + user[`${contactMethod.provider}_link`]
          : null;
        return !!socialLink ? (
          <a
            key={idx}
            href={socialLink}
            target="_blank"
            rel="noreferrer"
            data-tooltip-content={socialLink}
            id="socialLink"
          >
            <contactMethod.icon />
            <Tooltip anchorId="socialLink" place="bottom" />
          </a>
        ) : (
          <div className="opacity-50 cursor-not-allowed">
            <contactMethod.icon />
          </div>
        );
      })}
    </Fragment>
  );

  return (
    <>
      <div className="flex justify-between">
        <strong className="flex items-center">
          {forProfileModal ? "Contact Methods" : "Linked Socials"}:
        </strong>
        <div className="flex">
          {forProfileModal ? (
            <ContactMethodsForProfileModal />
          ) : (
            <ContactMethodsForProfileForm />
          )}
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
