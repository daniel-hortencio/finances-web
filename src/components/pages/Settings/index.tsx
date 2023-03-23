import { Box, Button } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Currencies } from "../../../constants/Currencies";
import { Languages } from "../../../constants/Languages";
import { Currency } from "../../../enums/Currency";
import { Language } from "../../../enums/Language";
import { userService } from "../../../services/User";
import { setUserPreferences, useAuthenticateUser } from "../../../store";
import { yupValidator } from "../../../utils/yupValidation";
import { Select } from "../../elements/Select";

export const Settings = () => {
  const [data, setData] = useState<{
    preferred_currency: Currency;
    language: Language;
  }>(
    {} as {
      preferred_currency: Currency;
      language: Language;
    }
  );

  const { control } = useForm();

  const state = useSelector(useAuthenticateUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.user) {
      setData({
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

    if (isNotChanged) return;

    userService
      .updateUserPreferences(data)
      .then((res) => {
        dispatch(setUserPreferences(data));
      })
      .catch((err) => console.log({ err }));
  };

  const isNotChanged =
    data.preferred_currency === state.user?.preferred_currency &&
    data.language === state.user.language;

  return (
    <Box bg="white" padding={2} boxShadow="base" borderRadius="md">
      <form onSubmit={handleUpdateUser}>
        <Box marginBottom={2}>
          <Select
            name="currency"
            label="Preferred Currency"
            control={control}
            options={Currencies.map((currency) => ({
              value: currency.value,
              name: currency.value,
            }))}
            value={data.preferred_currency}
            onChange={(e) => handleChange("preferred_currency", e.target.value)}
          />
        </Box>
        <Box marginBottom={8}>
          <Select
            name="language"
            label="Language"
            control={control}
            options={Languages.map((language) => ({
              value: language.value,
              name: language.value,
            }))}
            value={data.language}
            onChange={(e) => handleChange("language", e.target.value)}
          />
        </Box>

        <Box>
          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            disabled={isNotChanged}
          >
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};
