export interface IuserDataInputs {
  nameInput: string;
  emailInput: string;
  addressInput: string;
}
export interface IformValidation {
  nameInput: {
    isError: boolean;
    errorMessage: string;
  };
  emailInput: {
    isError: boolean;
    errorMessage: string;
  };
  addressInput: {
    isError: boolean;
    errorMessage: string;
  };
}

export type InputNames = "nameInput" | "emailInput" | "addressInput";
