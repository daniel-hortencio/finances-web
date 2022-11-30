import { useState } from "react";
import { useDispatch } from "react-redux";

import { SignInUserDTO } from "../../../types/User";
import { userService } from "../../../services/User";
import { authenticateUser } from "../../../store";
import { FormSignIn } from "./FormSignIn";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignIn = async (data: SignInUserDTO) => {
    setIsLoading(true);

    userService
      .signIn(data)
      .then(({ data }) => {
        dispatch(authenticateUser(data));
      })
      .catch((err) => {
        console.log({ err });
        setIsLoading(false);
      });
  };

  return <FormSignIn handleSubmit={handleSignIn} isLoading={isLoading} />;
};

export default SignIn;
