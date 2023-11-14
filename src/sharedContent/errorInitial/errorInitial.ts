const errorInitial: ErrorForm = { isError: false, errorMessage: " " };
export type ErrorForm = {
  isError: boolean;
  errorMessage: string;
};
export default errorInitial;
