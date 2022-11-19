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
