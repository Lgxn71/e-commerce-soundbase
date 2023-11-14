import { Dispatch, SetStateAction } from "react";

import { z } from "zod";

import { ErrorForm } from "../../sharedContent/errorInitial/errorInitial";

export const signInValidator = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const signInFormValidation = (
  signInForm: SignInForm,
  onSetFormValidation: Dispatch<
    SetStateAction<{
      emailError: ErrorForm;
      passwordError: ErrorForm;
    }>
  >
) => {
  const validatedCredentials = signInValidator.safeParse({
    email: signInForm.email,
    password: signInForm.password,
  });

  if (!validatedCredentials.success) {
    for (let i = 0; i < validatedCredentials.error.issues.length; i++) {
      if (validatedCredentials.error.issues[i].message === "Invalid email")
        onSetFormValidation((prev) => ({
          ...prev,
          emailError: { isError: true, errorMessage: "Invalid email" },
        }));

      if (validatedCredentials.error.issues[i].code === "too_small")
        onSetFormValidation((prev) => ({
          ...prev,
          passwordError: {
            isError: true,
            errorMessage: "Password must contain at least 8 characters",
          },
        }));
    }

    return;
  }

  const { data } = validatedCredentials;

  if (data.email === "") {
    onSetFormValidation((prev) => ({
      ...prev,
      emailError: { isError: true, errorMessage: "Email field empty" },
    }));
    return;
  }

  if (data.password === "") {
    onSetFormValidation((prev) => ({
      ...prev,
      passwordError: {
        isError: true,
        errorMessage: " Password field empty",
      },
    }));
    return;
  }
  return data;
};

export default signInFormValidation;
type SignInForm = z.infer<typeof signInValidator>;
