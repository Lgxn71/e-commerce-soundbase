import { useState, ChangeEvent } from "react";

const useFormInput = (formState: {}) => {
  const [user, setUser] = useState(formState);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  return {
    user,
    onChangeInput,
  };
};

export default useFormInput;
