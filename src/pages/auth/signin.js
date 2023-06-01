import useFormInput from "../../../hooks/useFormInput";

import { signIn } from "next-auth/react";

import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Form/Input";

const SignIn = () => {
  const { user, onChangeInput } = useFormInput({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    // if (error.isError) {
    //   return;
    // }
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    console.log(res);

    // place for validation
  };

  return (
    <Form
      hrefLink={"/auth/signup"}
      text="Don’t"
      hrefText="Sign Up"
      title="Sign in"
      formSubmitHandler={formSubmitHandler}
    >
      <Input
        name="email"
        type="email"
        placeholder="Enter your email address"
        onChange={onChangeInput}
      />
      <Input
        name="password"
        type="password"
        placeholder="Enter your password"
        onChange={onChangeInput}
      />
    </Form>
  );
};

export default SignIn;

// const [error, setError] = useState({ text: "dsds", isError: true });

// errorText={error.text}
// isError={error.isError}
