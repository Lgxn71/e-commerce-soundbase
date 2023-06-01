import useFormInput from "../../../hooks/useFormInput";

import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Form/Input";

const SignUp = () => {
  const { user, onChangeInput } = useFormInput({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, address, password, confirmPassword } = user;

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // place for UI ERROR HANDLING

    if (
      !email.includes("@") ||
      email.trim() === "" ||
      name.trim() === "" ||
      address.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      password.legth >= 8 ||
      password.trim() !== confirmPassword.trim()
    ) {
      console.log("error");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      body: {
        name: name,
        email: email,
        address: address,
        password: password,
        confirmPassword: confirmPassword,
      },
    });
    const data = await res.json();
  };

  return (
    <Form
      hrefLink={"/auth/signin"}
      text="Already"
      hrefText="Sign In"
      title="Sign up"
      formSubmitHandler={formSubmitHandler}
    >
      <Input
        type="text"
        placeholder="Enter your name"
        name="name"
        onChange={onChangeInput}
      />

      <Input
        type="email"
        placeholder="Enter your email address"
        name="email"
        onChange={onChangeInput}
      />
      <Input
        type="text"
        placeholder="Enter your home address"
        name="address"
        onChange={onChangeInput}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        name="password"
        onChange={onChangeInput}
      />
      <Input
        type="password"
        placeholder="Confirm your password"
        name="confirmPassword"
        onChange={onChangeInput}
      />
    </Form>
  );
};

export default SignUp;
