import { useState } from "react";

import { CreateUserDTO } from "../../../types/User";
import { userService } from "../../../services/User";
import { FormCreateUser } from "./FormCreateUser";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: CreateUserDTO) => {
    setIsLoading(true);

    userService
      .register(data)
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }))
      .finally(() => setIsLoading(false));
  };

  return <FormCreateUser handleSubmit={handleSignUp} isLoading={isLoading} />;
};

export default SignUp;
