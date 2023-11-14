import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { ErrorForm } from "../../sharedContent/errorInitial/errorInitial";

export const signUpValidator = z.object({
  name: z.string().trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  address: z.string().trim(),
  password: z.string().min(8).trim(),
  confirmPassword: z.string().min(8).trim(),
});

const signUpFormValidation = (
  signUpForm: SignUpForm,
  onSetFormValidation: Dispatch<
    SetStateAction<{
      nameError: ErrorForm;
      emailError: ErrorForm;
      addressError: ErrorForm;
      passwordError: ErrorForm;
      confirmPasswordError: ErrorForm;
    }>
  >
) => {
  const validatedSignUpForm = signUpValidator.safeParse({
    name: signUpForm.name,
    email: signUpForm.email,
    address: signUpForm.address,
    password: signUpForm.password,
    confirmPassword: signUpForm.confirmPassword,
  });
  if (signUpForm.name === "") {
    onSetFormValidation((prev) => ({
      ...prev,
      nameError: { isError: true, errorMessage: "Name field empty" },
    }));
  }
  if (signUpForm.address === "") {
    onSetFormValidation((prev) => ({
      ...prev,
      addressError: { isError: true, errorMessage: "Address field empty" },
    }));
  }

  if (signUpForm.confirmPassword !== signUpForm.password) {
    onSetFormValidation((prev) => ({
      ...prev,
      passwordError: { isError: true, errorMessage: "Password should match" },
      confirmPasswordError: {
        isError: true,
        errorMessage: "Password should match",
      },
    }));
  }

  if (!validatedSignUpForm.success) {
    for (let i = 0; i < validatedSignUpForm.error.issues.length; i++) {
      if (validatedSignUpForm.error.issues[i].path[0] === "email") {
        onSetFormValidation((prev) => ({
          ...prev,
          emailError: { isError: true, errorMessage: "Invalid email" },
        }));
      }

      if (validatedSignUpForm.error.issues[i].path[0] === "password") {
        onSetFormValidation((prev) => ({
          ...prev,
          passwordError: {
            isError: true,
            errorMessage: "Password should be at least 8 characters",
          },
        }));
      }
      if (validatedSignUpForm.error.issues[i].path[0] === "confirmPassword")
        onSetFormValidation((prev) => ({
          ...prev,
          confirmPasswordError: {
            isError: true,
            errorMessage: "Password should be at least 8 characters",
          },
        }));
    }
    return;
  }

  const { data } = validatedSignUpForm;

  return data;
};

export default signUpFormValidation;
export type SignUpForm = z.infer<typeof signUpValidator>;
