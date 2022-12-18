export interface IDropdownListOption {
  value: string;
  id?: number | string;
  emoji?: string;
  disabled?: boolean;
}

export interface ISignUpSelectOption extends IDropdownListOption {
  signUpHeader?: string;
  signUpDescription?: string;
}

export type IStorageBucket = "avatars" | "sound-snippets";
export type IAvailableContactMethod =
  | "instagram"
  | "whatsapp"
  | "discord"
  | "twitter";

export interface IContactMethod {
  provider: IAvailableContactMethod;
  icon: Component;
}
