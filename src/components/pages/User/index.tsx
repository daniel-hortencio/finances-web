import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Currency } from "../../../enums/Currency";
import { Language } from "../../../enums/Language";
import { userService } from "../../../services/User";
import {
  setUserInfoData,
  setUserPreferences,
  useAuthenticateUser,
} from "../../../store";
import { InputPassword } from "../../elements/InputPassword";
import { InputText } from "../../elements/InputText";

export const User = () => {
  const [data, setData] = useState<{
    name: string;
    preferred_currency: Currency;
    language: Language;
  }>(
    {} as {
      name: string;
      preferred_currency: Currency;
      language: Language;
    }
  );

  const {
    control,
    setError,
    formState: { errors },
  } = useForm();

  const state = useSelector(useAuthenticateUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.user) {
      setData({
        name: state.user.name,
        preferred_currency: state.user.preferred_currency,
        language: state.user.language,
      });
    }
  }, [state.user]);

  const handleChange = (param: keyof typeof data, value: string) => {
    setData((data) => ({ ...data, [param]: value }));
  };

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();

    console.log({ data });

    userService
      .updateUserInfos(data)
      .then(() => {
        dispatch(setUserInfoData(data));
      })
      .catch((err) => console.log({ err }));
  };

  const profile_not_changed = data.name === state.user?.name;

  return (
    <Box bg="white" padding={2} boxShadow="base" borderRadius="md">
      <Tabs colorScheme="teal">
        <TabList>
          <Tab>Perfil</Tab>
          <Tab>Security</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading size="md" mt={4} mb={8}>
              User Data
            </Heading>
            <form onSubmit={handleUpdateUser}>
              <Box marginBottom={2}>
                <InputText
                  name="name"
                  label="Name"
                  control={control}
                  value={data.name as string}
                  onChange={handleChange}
                />
              </Box>
              <Box marginBottom={2}>
                <InputText
                  name="email"
                  label="Email"
                  control={control}
                  value={state.user?.email as string}
                  disabled
                />
              </Box>

              <Box paddingTop={8}>
                <Button
                  colorScheme="teal"
                  size="md"
                  type="submit"
                  disabled={profile_not_changed}
                >
                  Update
                </Button>
              </Box>
            </form>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mt={4} mb={8}>
              Change Password
            </Heading>
            <form>
              <Box marginBottom={2}>
                <InputPassword
                  name="password"
                  label="Password"
                  error={errors?.password?.message}
                />
              </Box>
              <Box marginBottom={2}>
                <InputPassword
                  name="new_password"
                  label="New Password"
                  error={errors?.password?.message}
                />
              </Box>
              <Box marginBottom={2}>
                <InputPassword
                  name="confirm_new_password"
                  label="Confirm New Password"
                  error={errors?.confirm_password?.message}
                />
              </Box>

              <Box paddingTop={8}>
                <Button
                  colorScheme="teal"
                  size="md"
                  type="submit"
                  //isLoading={isLoading}
                >
                  Update aqui
                </Button>
              </Box>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
